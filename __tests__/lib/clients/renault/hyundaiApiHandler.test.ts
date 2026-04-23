
import HyundaiApiHandler from "../../../../src/lib/clients/apiHandlers/hyundaiApiHandler";
import AppPreferences from "@kelec/app-preferences";

const mockApiData = require('../../../CarView/mocks/mockHyundaiApiData.json');
const mockStatus = {
    hasError: false,
    apiData: mockApiData
}
const hyundaiApiHandler = new HyundaiApiHandler(mockStatus);

const appPreferences = new AppPreferences();

describe('test miles handling', () => {

    test('test range and mileage with no api status', () => {
        const apiHandler = new HyundaiApiHandler();
        const range = apiHandler.getCarRange(appPreferences);
        expect(range).toBe(0);

        const mileage = apiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(0);
    });
    test('test range and mileage with fetch error', () => {
        const apiHandler = new HyundaiApiHandler({ hasError: true });
        const range = apiHandler.getCarRange(appPreferences);
        expect(range).toBe(0);

        const mileage = apiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(0);
    });
    test('test range and mileage in km', () => {
        // first, get range
        const range = hyundaiApiHandler.getCarRange(appPreferences);
        expect(range).toBe(175);

        const mileage = hyundaiApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(48459.1);
    });

    test('test range in km and mileage in miles', () => {
        appPreferences.displayMiles = true;
        const range = hyundaiApiHandler.getCarRange(appPreferences);
        expect(range).toBe(175); // range should not change

        const mileage = hyundaiApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(30111); // mileage should have changed
    });

    test('test range and mileage in miles', () => {
        appPreferences.convertToMiles = true;
        const range = hyundaiApiHandler.getCarRange(appPreferences);
        expect(range).toBe(109);

        const mileage = hyundaiApiHandler.getCarMileage(appPreferences);
        expect(mileage).toBe(30111);
    });

    test('should not be v2g', () => {
        const isV2g = hyundaiApiHandler.getIsV2GOrV2L();
        expect(isV2g).toBe(false);
    });



});     