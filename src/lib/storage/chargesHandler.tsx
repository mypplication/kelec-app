import AsyncStorage from "@react-native-async-storage/async-storage";
import RenaultCharge from "../clients/apiHandlers/renaultCharges/RenaultCharge";
import StorageHandler from "./storageHandler";
import { getMileageHistory, MileageLog } from "./sharedPlatformsData";

class ChargesStorageController {
    static readonly storageHandler = new StorageHandler();
    static async getCharges(vin: string): Promise<RenaultCharge[] | null> {
        // first, get previous stored charges
        const storedCharges = await AsyncStorage.getItem(vin + '/' + 'chargesHistorySaved');
        if (storedCharges !== null) {
            const charges = JSON.parse(storedCharges);
            const parsedCharges = this.storageHandler.buildCharges(charges);
            return parsedCharges;
        }
        // now get charges using the new system (with indices)
        const amountOfCharges = await AsyncStorage.getItem(vin + '/' + 'chargesHistoryAmount');
        if (amountOfCharges === null) return null; // no charge has even been saved
        const parsedAmountOfCharges = parseInt(amountOfCharges);
        const charges: RenaultCharge[] = [];
        let number_of_index = Math.ceil(parsedAmountOfCharges / 50); // charges are stored in batches of 50
        for (let i = 0; i < number_of_index; i++) {
            const charges_temp = await AsyncStorage.getItem(vin + '/' + 'chargesHistoryIndex' + i);
            if (charges_temp !== null) {
                const parsedCharge = JSON.parse(charges_temp);
                charges.push(...parsedCharge);
            }
        }

        const parsedCharges: RenaultCharge[] = this.storageHandler.buildCharges(charges);
        return parsedCharges;
    };

    static async saveNewCharges(vin: string, newCharges: RenaultCharge[]): Promise<RenaultCharge[]> {
        // save the new charges in the async storage
        // then return the updated charges

        // first, remove charges without chargeStartDate
        newCharges = newCharges.filter((charge: RenaultCharge) => charge.chargeStartDate !== undefined);
        let storedCharges = await this.getCharges(vin);
        if (storedCharges === null) {
            storedCharges = [];
        }

        const updatedCharges = [...newCharges, ...storedCharges,];
        // remove duplicates where charges have the same chargeStartDate
        let uniqueCharges = updatedCharges.filter((charge, index, self) =>
            index === self.findIndex((c) => c.chargeStartDate === charge.chargeStartDate)
        );

        // sort by date
        uniqueCharges.sort((a: RenaultCharge, b: RenaultCharge) => {
            const dateA = new Date(a.chargeStartDate ?? Date.now());
            const dateB = new Date(b.chargeStartDate ?? Date.now());
            return dateA.getTime() - dateB.getTime();
        });

        // then when compute the mileage at the start of the charge
        const mileageHistory: MileageLog[] | null = await getMileageHistory(vin);
        if (mileageHistory !== null && mileageHistory?.length > 0) {
            uniqueCharges.forEach((charge: RenaultCharge) => {
                if (charge.mileageAtStart !== undefined) return; // already computed
                const mileageResult = this.getMileageAtStart(charge, mileageHistory);
                if (mileageResult !== null && mileageResult.length > 0) {
                    const [mileage, isAccurate] = mileageResult;
                    if (mileage !== undefined) {
                        charge.mileageAtStart = mileage;
                        charge.inaccurateMileage = isAccurate;
                    }
                }
            })
        }

        const number_of_charges = uniqueCharges.length;
        const number_of_batches = Math.ceil(number_of_charges / 50);
        // save the number of charges
        await AsyncStorage.setItem(vin + '/' + 'chargesHistoryAmount', number_of_charges.toString());
        // save the charges in batches of 50
        for (let i = 0; i < number_of_batches; i++) {
            const batch = uniqueCharges.slice(i * 50, (i + 1) * 50);
            await AsyncStorage.setItem(vin + '/' + 'chargesHistoryIndex' + i, JSON.stringify(batch));
        }

        const old_charges = await AsyncStorage.getItem(vin + '/' + 'chargesHistorySaved');
        if (old_charges !== null) await AsyncStorage.removeItem(vin + '/' + 'chargesHistorySaved');

        return uniqueCharges;
    };

    static getMileageAtStart(charge: RenaultCharge, mileageHistory: MileageLog[]): [number, boolean] | null {
        const chargeStartDate = charge.getStartDate();

        // d'abord on vérifie que le début de l'historique comment bien après le debut de la charge
        let startMileagelogTime = new Date(mileageHistory[0].timestamp);
        if (chargeStartDate.getTime() < startMileagelogTime.getTime()) {
            return null;
        }

        let startMileage = mileageHistory.find((log: any) => {
            const logTime = new Date(log.timestamp).getTime();
            const chargeTime = chargeStartDate.getTime();
            return logTime >= chargeTime;
        });

        if (!startMileage) {
            return null;
        }

        const chargeEndDate = charge.getEndDate();

        let isChargeInaccurate = false;

        if (new Date(startMileage.timestamp).getTime() > chargeEndDate.getTime()) {
            isChargeInaccurate = true;
        }

        if (isChargeInaccurate) {

            // on revient en arrière pour regarder si le dernier log avant le début de la charge a le même kilométrage
            let previousMileage = mileageHistory.slice().reverse().find((log: any) => {
                const logTime = new Date(log.timestamp).getTime();
                const chargeTime = chargeStartDate.getTime();
                return logTime < chargeTime;
            });

            if (previousMileage && previousMileage.mileage === startMileage.mileage) {
                isChargeInaccurate = false;
            } else {
                isChargeInaccurate = true;
            }
        }

        return [startMileage.mileage, isChargeInaccurate];
    }
};

export default ChargesStorageController;