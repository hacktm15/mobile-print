package ro.homefile.printer;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.*;
import java.util.*;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import com.mocoo.hang.rtprinter.driver.*;

public class Printer extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();

        BluetoothDevice device = pairedDevices.iterator().next();

        Log.d("get device", device.getName());
        Log.d("size", pairedDevices.size() + "");

        connectBluetooth( device );

        if (action.equals("getBluetoothDevices")) {

            String name = data.getString(0);
            String message = "['a','b']";
            callbackContext.success(message);

            return true;

        } else {
            
            return false;

        }
    }

    private void connectBluetooth(BluetoothDevice bluetoothDevice) {
        HsBluetoothPrintDriver hsBluetoothPrintDriver = HsBluetoothPrintDriver.getInstance();
        hsBluetoothPrintDriver.start();
        hsBluetoothPrintDriver.connect(bluetoothDevice);

        hsBluetoothPrintDriver.start();
        hsBluetoothPrintDriver.Begin();

        hsBluetoothPrintDriver.SelftestPrint();
    }
}
