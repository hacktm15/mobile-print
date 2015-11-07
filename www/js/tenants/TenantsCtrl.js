/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("TenantsCtrl", [
        "$scope",
        "$rootScope",
        "$log",
        "$stateParams",
        "$state",
        "$ionicPopup",
        "Apartments",
        "DAO",
        function($scope, $rootScope, $log, $stateParams, $state, $ionicPopup, Apartments) {
            var idAssociation = $stateParams.id;

            Apartments.get(idAssociation).then(
                function success(res) {
                    $scope.apartments = res.data;
                },
                function error() {
                    $log.error("Could not retrieve apartments for idAssociation: " + $scope.idAssociation);
                }
            );

            $scope.view = function(idApartment) {
                $state.go("tenant", {idAssociation: idAssociation, idTenant: idApartment});
            }
        }
    ]);

}(angular.module("homefile")));