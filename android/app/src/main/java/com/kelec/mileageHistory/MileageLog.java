package com.kelec.mileageHistory;

public class MileageLog {
    private double mileage;
    private String timestamp;

    public MileageLog(double mileage, String timestamp){
        this.mileage = mileage;
        this.timestamp = timestamp;
    }

    public String getTimestamp(){
        return timestamp;
    }
}
