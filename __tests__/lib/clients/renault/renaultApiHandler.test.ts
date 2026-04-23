
import AppPreferences from "../../../../src/lib/appPreferences/model/appPreferences";
import RenaultApiHandler from "../../../../src/lib/clients/apiHandlers/renaultApiHandler";

const mockBatteryStatus = require('../../../CarView/mocks/mockRenaultBattery.json');
const mockBatteryHandlerStatus = {
    hasError: false,
    apiData: mockBatteryStatus
}

const mockCockpitStatus = require('../../../CarView/mocks/mockRenaultCockpit.json');
mockCockpitStatus.fuelAutonomy = 100; // 100km of ice range
const mockCockpitHandlerStatus = {
    hasError: false,
    apiData: mockCockpitStatus
}
const renaultApiHandler = new RenaultApiHandler();
renaultApiHandler.setApiData(mockBatteryHandlerStatus);
renaultApiHandler.setCockpitStatus(mockCockpitHandlerStatus);

const appPreferences = new AppPreferences();

describe('test miles handling', () => {

    test('test range and mileage with no api status', () => {
        const apiHandler = new RenaultApiHandler();
        const range = apiHandler.getCarRange(appPreferences);
        expect(range).toBe(0);

        const mileage = apiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(0);

        const iceRange = apiHandler.getICERange(appPreferences);
        expect(iceRange).toBe(0);
    });

    test('test range and mileage with fetch error', () => {
        const apiHandler = new RenaultApiHandler({ hasError: true });
        const range = apiHandler.getCarRange(appPreferences);
        expect(range).toBe(0);

        const mileage = apiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(0);

        const iceRange = apiHandler.getICERange(appPreferences);
        expect(iceRange).toBe(0);
    });

    test('test range and mileage in km', () => {
        // first, get range
        const range = renaultApiHandler.getCarRange(appPreferences);
        expect(range).toBe(202);

        const mileage = renaultApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(30995.16015625);

        const iceRange = renaultApiHandler.getICERange(appPreferences);
        expect(iceRange).toBe(100);
    });

    test('test range in km and mileage in miles', () => {
        appPreferences.displayMiles = true;
        const range = renaultApiHandler.getCarRange(appPreferences);
        expect(range).toBe(202); // range should not change

        const iceRange = renaultApiHandler.getICERange(appPreferences);
        expect(iceRange).toBe(100); // ice range should not change

        const mileage = renaultApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(19259); // mileage should have changed
    });

    test('test range and mileage in miles', () => {
        appPreferences.convertToMiles = true;
        const range = renaultApiHandler.getCarRange(appPreferences);
        expect(range).toBe(126);

        const mileage = renaultApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(19259);

        const iceRange = renaultApiHandler.getICERange(appPreferences);
        expect(iceRange).toBe(62); // 100km = 62 miles
    })
});

describe('get charge test', () => {
    test('should display v2g and v2l', () => {
        const mockBatteryHandlerStatus = {
            hasError: false,
            apiData: mockBatteryStatus
        }
        mockBatteryHandlerStatus.apiData.chargingStatus = -1.3;
        renaultApiHandler.setApiData(mockBatteryHandlerStatus);
        let chargeText = renaultApiHandler.getChargeText();
        expect(chargeText).toBe('V2G');

        mockBatteryHandlerStatus.apiData.chargingStatus = -1.4;
        renaultApiHandler.setApiData(mockBatteryHandlerStatus);
        chargeText = renaultApiHandler.getChargeText();
        expect(chargeText).toBe('V2L');

        mockBatteryHandlerStatus.apiData.chargingStatus = -1.5;
        renaultApiHandler.setApiData(mockBatteryHandlerStatus);
        chargeText = renaultApiHandler.getChargeText();
        expect(chargeText).toBe('V2G');

        mockBatteryHandlerStatus.apiData.chargingStatus = -1.6;
        renaultApiHandler.setApiData(mockBatteryHandlerStatus);
        chargeText = renaultApiHandler.getChargeText();
        expect(chargeText).toBe('V2G');
    });
});