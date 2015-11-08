/**
 * Copyright (C) 2014 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("OutgoCtrl", [
        "$scope",
        "$rootScope",
        "$state",
        "$ionicPopup",
        "Auth",
        "DAO",
        function($scope, $rootScope, $state, $ionicPopup, Auth, DAO) {

            var success = function(message) {
                console.log(message);
            };

            var failure = function() {
                alert("Error calling Hello Plugin");
            };

            $scope.print = function() {
                printer.getBluetoothDevices("test", success, failure);

                //ble.startScan([], function(device) {
                //    console.log(JSON.stringify(device));
                //}, failure);
                //
                //setTimeout(ble.stopScan,
                //    5000,
                //    function() { console.log("Scan complete"); },
                //    function() { console.log("stopScan failed"); }
                //);
                //


                //var gotUuids = function(device) {
                //    console.log('got UUID\'s for device', device);
                    //var onConnection = function() {
                    //    console.log('got connection');
                    //    self.model.set({
                    //        isConnected: true
                    //    });
                    //
                    //    var onConnectionLost = function() {
                    //        console.log('lost connection');
                    //        self.model.set({
                    //            isConnected: false
                    //        });
                    //        onFail();
                    //    }
                    //    console.log('output data to console...');
                    //    window.bluetooth.startConnectionManager(
                    //        console.log, onConnectionLost);
                    //}
                    //
                    //window.bluetooth.connect(onConnection, onFail, {
                    //    uuid:    device.uuids[0],
                    //    address: self.model.get('address')
                    //});
                //};

                //var onFail = function() {
                //    console.log("get uuids failed");
                //};
                //
                //window.bluetooth.getUuids(gotUuids, onFail, 'address');
            };

        }
    ]);

}(angular.module("homefile")));