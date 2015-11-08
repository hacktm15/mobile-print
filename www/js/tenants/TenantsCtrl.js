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
        "apartments",
        function($scope, $rootScope, $log, $stateParams, $state, $ionicPopup, apartments) {
            var idAssociation = $stateParams.idAssociation;
            $scope.apartments = apartments;

            $scope.view = function(idApartment) {
                $state.go("tenant", {idAssociation: idAssociation, idTenant: idApartment});
            }
        }
    ]);

}(angular.module("homefile")));