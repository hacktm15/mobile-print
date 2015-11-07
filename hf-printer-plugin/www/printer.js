/*global cordova, module*/

module.exports = {
    getBluetoothDevices: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Printer", "getBluetoothDevices", [name]);
    }
};
