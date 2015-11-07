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
            };

        }
    ]);

}(angular.module("homefile")));