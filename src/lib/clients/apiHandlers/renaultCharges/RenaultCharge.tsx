import { formatNumberWithLeadingZero } from "../../../graphics/utils";
import { Filter } from "../../../model/filters/FiltersStruct";
import { V2GApiSession } from "../../carMakers/renault/v2gApiResponse";

interface RenaultChargeInterface {
    chargeStartDate?: string;
    chargeEndDate?: string;
    chargeDuration?: number;
    chargeStartBatteryLevel?: number;
    chargeEndBatteryLevel?: number;
    chargeEnergyRecovered?: number;
    chargeEndStatus?: string;
    isAMergeCharge?: boolean;
    subCharges?: RenaultCharge[];
    mileageAtStart?: number; // mileage at the start of the charge, if available
    inaccurateMileage?: boolean; // if true, the mileage at start is not accurate bc of start time.
    V2GEnergyDischarged?: number; // enrgy discharged to the grid
    isV2G: boolean; // if true, the charge is a V2G charge

    canBeFilterDisplayed(filters: Filter[]): boolean;
    getStartDate(): Date;
    getEndDate(): Date;
    getIsSameDay(): boolean;
    getEndPercentage(): number;
    getStartPercentage(): number;
    getChargeLength(): string;
    getEnergyRecovered(): number;
    getAverageChargeSpeed(): number;
    getMileageAtStart(): number | undefined;
    getIsInaccurateMileage(): boolean;
}

class RenaultCharge implements RenaultChargeInterface {
    constructor(
        public chargeStartDate?: string,
        public chargeEndDate?: string,
        public chargeDuration?: number,
        public chargeStartBatteryLevel?: number,
        public chargeEndBatteryLevel?: number,
        public chargeEnergyRecovered?: number,
        public chargeEndStatus?: string,
        public isAMergeCharge?: boolean,
        public subCharges?: RenaultCharge[],
        public mileageAtStart?: number,
        public inaccurateMileage?: boolean,
        public V2GEnergyDischarged?: number,
        public isV2G: boolean = false,
    ) {
        this.chargeStartDate = chargeStartDate;
        this.chargeEndDate = chargeEndDate;
        this.chargeDuration = chargeDuration;
        this.chargeStartBatteryLevel = chargeStartBatteryLevel;
        this.chargeEndBatteryLevel = chargeEndBatteryLevel;
        this.chargeEnergyRecovered = chargeEnergyRecovered;
        this.chargeEndStatus = chargeEndStatus;
        this.isAMergeCharge = isAMergeCharge;
        this.subCharges = subCharges ?? [];
        this.mileageAtStart = mileageAtStart;
        this.inaccurateMileage = inaccurateMileage;
        this.V2GEnergyDischarged = V2GEnergyDischarged;
        this.isV2G = isV2G;

    }

    // TO DO
    canBeFilterDisplayed(filters: Filter[]): boolean {
        return true;
    }

    getStartDate(): Date {
        return new Date(this.chargeStartDate ?? Date.now());
    }

    getEndDate(): Date {
        return new Date(this.chargeEndDate ?? Date.now());
    }

    getIsSameDay(): boolean {
        const startDate = new Date(this.chargeStartDate ?? Date.now());
        const endDate = new Date(this.chargeEndDate ?? Date.now());
        return startDate.getDate() === endDate.getDate();
    }

    getEndPercentage(): number {
        return this.chargeEndBatteryLevel ?? 0;
    }

    getStartPercentage(): number {
        return this.chargeStartBatteryLevel ?? 0;
    }

    getChargeLength(): string {
        if (this.isAMergeCharge) {
            // If it's a merge charge, we return the total duration of the subcharges
            const totalDuration = this.subCharges?.reduce((acc, charge) => acc + (charge.chargeDuration ?? 0), 0) ?? 0;
            const hours = Math.floor(totalDuration / 60);
            const minutes = totalDuration % 60;
            return `${hours}h${formatNumberWithLeadingZero(minutes)}`;
        }
        const start = this.getStartDate();
        start.setSeconds(0);
        const end = this.getEndDate();
        end.setSeconds(0);
        const diff = end.getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60)) - (hours * 60);
        return `${hours}h${formatNumberWithLeadingZero(minutes)}`;
    }

    private getChargeLengthInMinutes(): number {
        return this.chargeDuration ?? 0;
    }

    getEnergyRecovered(): number {
        return this.chargeEnergyRecovered ?? 0;
    }

    getAverageChargeSpeed(): number {
        // returns the average charging power in kW
        return this.getEnergyRecovered() / (this.getChargeLengthInMinutes() / 60);
    }

    getIsAMergeCharge(): boolean {
        return this.isAMergeCharge ?? false;
    }

    getSubCharges(): RenaultCharge[] {
        return this.subCharges ?? [];
    }

    getMileageAtStart(): number | undefined {
        return this.mileageAtStart;
    }

    getIsInaccurateMileage(): boolean {
        return this.inaccurateMileage ?? false;
    }

    getV2GEnergyDischarged(): number {
        return this.V2GEnergyDischarged ?? 0;
    }

    getV2GEnergyCharged(): number {
        return this.getEnergyRecovered() + this.getV2GEnergyDischarged();
    }

    public static convertV2GSessionsToCharges(sessions: V2GApiSession[]): RenaultCharge[] {
        return sessions.map((session) => {
            return new RenaultCharge(
                session.startDateTime,
                session.endDateTime,
                Math.floor(session.totalSessionDuration / 60), // integer division to convert seconds to minutes
                session.sessionStartBatteryLevel,
                session.sessionEndBatteryLevel,
                session.energyMobility,
                session.status,
                false,
                [],
                undefined,
                undefined,
                session.energyDischarged,
                true
            );
        });
    }
}

export default RenaultCharge;