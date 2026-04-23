import TemperatureHandler from '../../src/lib/model/TemperatureHandler';
import React from 'react';


test('should keep in memory the default temperature', async () => {
    const vin = 'VIN';
    const storedTemperature = await TemperatureHandler.getTemperature(vin);
    expect(storedTemperature).toBe(21); // defaul temperature

    // now save a temperature
    await TemperatureHandler.setTemperature(vin, 22);
    const newStoredTemperature = await TemperatureHandler.getTemperature(vin);
    expect(newStoredTemperature).toBe(22); // new temperature
});