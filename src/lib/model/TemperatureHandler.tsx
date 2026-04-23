// this class is used to handle stored default temperatures for havc launching

import AsyncStorage from "@react-native-async-storage/async-storage";

class TemperatureHandler {

    static readonly getTemperature = async (vin: string): Promise<number> => {
        const storedTemperature = await AsyncStorage.getItem(vin + "_savedTemperature");
        if (storedTemperature) {
            return parseFloat(storedTemperature);
        }
        return 21;
    };

    static readonly setTemperature = async (vin: string, temperature: number): Promise<void> => {
        await AsyncStorage.setItem(vin + "_savedTemperature", temperature.toString());
    };

};

export default TemperatureHandler;