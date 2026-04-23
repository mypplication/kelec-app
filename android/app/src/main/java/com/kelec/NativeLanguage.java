package com.kelec;

import android.os.Build;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NativeLanguage extends ReactContextBaseJavaModule {
    ReactApplicationContext context;

    public NativeLanguage(ReactApplicationContext reactContext){
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName(){
        return "NativeLanguage";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getLanguage() {
        return context.getResources().getConfiguration().locale.getLanguage();
    }
}
