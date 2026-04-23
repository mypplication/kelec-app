import CarMakerClient from "./carMakerClient";

type HyundaiApiVehicle = {
    hasError: boolean;
    vehicles: {
        vin: string;
        name: string;
        imageUrl: string;
        registrationNumber?: string;
    }[];
}

type HyundaiStatus = {
    hasError: boolean;
    apiData?: {
        vehicleLocation: {
            coord: {
                lat: number;
                lon: number;
                alt: number;
                type: number;
            };
            head: number;
            speed: {
                speed: number;
                unit: string;
            };
            accuracy: {
                hdop: number;
                pdop: number;
            };
            time: string;
        }
        vehicleStatus: {
            airCtrlOn: boolean;
            engine: boolean;
            doorLock: boolean;
            doorOpen: {
                frontLeft: number;
                frontRight: number;
                backLeft: number;
                backRight: number;
            };
            trunkOpen: boolean;
            airTemp: {
                value: string;
                unit: number;
                hvacTempType: number;
            };
            defrost: boolean;
            acc: boolean;
            evStatus: {
                batteryCharge: boolean;
                batteryStatus: number;
                batteryPlugin: number;
                remainTime2: {
                    etc1: {
                        value: number;
                        unit: number;
                    },
                    etc2: {
                        value: number;
                        unit: number;
                    }
                    etc3: {
                        value: number;
                        unit: number;
                    }
                    atc: {
                        value: number;
                        unit: number;
                    }
                };
                drvDistance: {
                    rangeByFuel: {
                        evModeRange: {
                            value: number;
                            unit: number;
                        }
                        totalAvailableRange: {
                            value: number;
                            unit: number;
                        }
                    }
                }[];
                reservChargeInfos: {
                    targetSOClist: {
                        targetSOClevel: number;
                        plugType: number;
                    }[];
                }

            };
            hoodOpen: boolean;
            steerWheelHeat: boolean;
            sideBackWindowHeat: boolean;
            battery: {
                batSoc: number;
                batState: number;
            }
            sleepModeCheck: boolean;
            time: string;
        };
        odometer: {
            value: number;
            unit: number;
        }
    }
}


class HyundaiClient extends CarMakerClient {

    private static readonly API_URL: string = "https://bluelink.selme.se";

    pinCode: string;
    constructor(email: string, password: string, pinCode: string) {
        super(email, password);
        this.pinCode = pinCode;
    };

    getPinCode = (): string => {
        return this.pinCode;
    };

    checkAuthorised = async (): Promise<boolean> => {
        // check if the user is in the list of the authorised person to use the app
        const url = `${HyundaiClient.API_URL}/authorised`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.getEmail() })
        });
        try {
            const data = await response.json();
            return data.message == "OK";
        } catch (e) {
            return false;
        }
    };

    checkLogin = async (): Promise<boolean> => {
        // check for user creds in the hyundai servers
        try {
            const url = `${HyundaiClient.API_URL}/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.getEmail(), password: this.getPassword(), pin: this.getPinCode() })
            });
            try {
                const data = await response.json();
                return data.message === "OK";
            } catch (e) {
                return false;
            }
        } catch {
            return false;
        }
    };

    launchHVAC = async (vin: string, temperature: number): Promise<boolean> => {
        // launch the HVAC system
        const url = `${HyundaiClient.API_URL}/car/launchHVAC`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.getEmail(), password: this.getPassword(), pin: this.getPinCode(), vin: vin, temperature: temperature })
        });
        try {
            const data = await response.json();
            return data.message == "OK";
        } catch (e) {
            return false;
        }
    }

    getVehicles = async (): Promise<HyundaiApiVehicle> => {
        const url = `${HyundaiClient.API_URL}/vehicles`;
        try {


            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.getEmail(), password: this.getPassword(), pin: this.getPinCode() })
            });
            try {
                const data = await response.json();
                if (data.message === "OK") {
                    return {
                        hasError: false,
                        vehicles: data.vehicles

                    }
                } else {
                    return {
                        hasError: true,
                        vehicles: []
                    }
                }
            } catch (e) {
                return {
                    hasError: true,
                    vehicles: []
                }
            }
        } catch {
            // no network
            return {
                hasError: true,
                vehicles: []
            }
        }
    }

    getCarStatus = async (vin: string): Promise<HyundaiStatus> => {
        const url = `${HyundaiClient.API_URL}/car/status`;
        const body = {
            email: this.getEmail(),
            password: this.getPassword(),
            pin: this.getPinCode(),
            vin: vin
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });
            try {
                const data = await response.json();
                if (data.message === "OK") {
                    return {
                        hasError: false,
                        apiData: data.status
                    }
                }
                return {
                    hasError: true,
                }
            } catch (e) {
                return {
                    hasError: true,
                }
            }
        } catch {
            // no network
            return {
                hasError: true
            }
        }

    };
}



export default HyundaiClient;
export type { HyundaiApiVehicle, HyundaiStatus };