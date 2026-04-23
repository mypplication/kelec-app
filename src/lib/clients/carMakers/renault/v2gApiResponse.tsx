type V2GApiResponse = {
    _embedded?: {
        sessions?: V2GApiSession[];
    }
};

type V2GApiSession = {
    personId: string;
    vin: string;
    startDateTime: string;
    endDateTime: string;
    totalSessionDuration: number; // in seconds
    nonSmartChargeSessionDuration: number; // in seconds
    socMinReachedDateTime?: string;
    smartChargeSessionDuration: number; // in seconds
    totalEnergyRecovered: number; // in kWh total energy charged
    energyDischarged: number; // in kWh total energy discharged
    nonSmartEnergyRecovered: number;
    smartEnergyRecovered: number;
    energyMobility: number; // energy charged minus energy discharged
    sessionStartBatteryLevel: number;
    sessionEndBatteryLevel: number;
    status: string;
}

export type { V2GApiResponse, V2GApiSession };