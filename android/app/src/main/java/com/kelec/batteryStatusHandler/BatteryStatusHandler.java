package com.kelec.batteryStatusHandler;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.kelec.ApiHandler.BatteryStatusAttributes;
public class BatteryStatusHandler {
    static public void saveBatteryStatus(Context context, String vin, BatteryStatusAttributes batteryStatus) {
        if (context == null || vin == null || batteryStatus == null) {
            return;
        }

        SharedPreferences preferences = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        String key = vin + "_batteryStatus";

        Gson gson = new Gson();
        try {
            preferences.edit()
                    .putString(key, gson.toJson(batteryStatus))
                    .apply();
            return;
        } catch (Exception e) {
            return;
        }
    }
}

