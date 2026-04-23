import HyundaiClient, { HyundaiStatus } from "../carMakers/hyundaiClient";
import CarModel from "../cars/carModel";
import Account, { CarMaker } from "./account";

class HyundaiAccount extends Account {
    pinCode: string;

    constructor(email: string, password: string, pinCode: string, car?: CarModel) {
        super(email, password, CarMaker.HYUNDAI, car);
        this.pinCode = pinCode;
    }

    getPinCode = (): string => {
        return this.pinCode;
    }

    fetchCarStatus = async (vin: string): Promise<HyundaiStatus> => {
        const client = new HyundaiClient(this.getEmail(), this.getPassword(), this.pinCode);
        const data = await client.getCarStatus(vin);
        return data;
    }

    launchHVAC = async (temperature: number): Promise<boolean> => {
        const client = new HyundaiClient(this.getEmail(), this.getPassword(), this.pinCode);
        return await client.launchHVAC(this.car?.getVin() ?? "", temperature);
    }
}

export default HyundaiAccount;