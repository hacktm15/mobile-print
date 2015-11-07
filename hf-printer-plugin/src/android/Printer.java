package ro.homefile.printer;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class Printer extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("getBluetoothDevices")) {

            String name = data.getString(0);
            String message = "['a','b']";
            callbackContext.success(message);

            return true;

        } else {
            
            return false;

        }
    }
}
