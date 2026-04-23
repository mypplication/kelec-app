import HyundaiClient from "../../../../src/lib/clients/carMakers/hyundaiClient";

const hyundaiClient = new HyundaiClient("email", "password", "8056");
describe('basics', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have set email', () => {
        expect(hyundaiClient.getEmail()).toBe("email");
    });

    it('should have set a pin code', () => {
        expect(hyundaiClient.getPinCode()).toBe("8056");
    });

    it('checkAuthorised', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                "message": "OK"
            })
        })
            .mockResolvedValueOnce("error")

        const authorised = await hyundaiClient.checkAuthorised();
        expect(authorised).toBe(true);
        const authorised2 = await hyundaiClient.checkAuthorised();
        expect(authorised2).toBe(false);
    });

    it('checkLogin', async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    "message": "OK"
                })
            })
            .mockResolvedValueOnce("error")
            .mockRejectedValueOnce(new Error("error"))

        const authorised = await hyundaiClient.checkLogin();
        expect(authorised).toBe(true);
        const authorised2 = await hyundaiClient.checkLogin();
        expect(authorised2).toBe(false);
        const authorised3 = await hyundaiClient.checkLogin();
        expect(authorised3).toBe(false);
    });

    it('getVehicles', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                "message": "OK",
                "vehicles": [

                ]
            })
        })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    "message": "ERROR",
                })
            })
            .mockResolvedValueOnce("error")
            .mockRejectedValueOnce(new Error("error"));

        const vehicles = await hyundaiClient.getVehicles();
        expect(vehicles.vehicles).toStrictEqual([]);
        const vehicles2 = await hyundaiClient.getVehicles();
        expect(vehicles2.hasError).toBe(true);
        const vehicles3 = await hyundaiClient.getVehicles();
        expect(vehicles3.hasError).toBe(true);
        const vehicles4 = await hyundaiClient.getVehicles();
        expect(vehicles4.hasError).toBe(true);
    });

    it('getCarStatus', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                "message": "OK",
                "status": {

                }
            })
        })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce({
                    "message": "ERROR",
                })
            })
            .mockResolvedValueOnce("error")
            .mockRejectedValueOnce(new Error("error"));

        const status = await hyundaiClient.getCarStatus("vin");
        expect(status.apiData).toStrictEqual({});
        const status2 = await hyundaiClient.getCarStatus("vin");
        expect(status2.hasError).toBe(true);
        const status3 = await hyundaiClient.getCarStatus("vin");
        expect(status3.hasError).toBe(true);
        const status4 = await hyundaiClient.getCarStatus("vin");
        expect(status4.hasError).toBe(true);
    });

    it('launchHVAC', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                "message": "OK"
            })
        })
            .mockResolvedValueOnce("error")

        const authorised = await hyundaiClient.launchHVAC();
        expect(authorised).toBe(true);
        const authorised2 = await hyundaiClient.launchHVAC();
        expect(authorised2).toBe(false);
    });



});