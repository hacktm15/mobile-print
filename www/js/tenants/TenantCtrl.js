/**
 * Copyright (C) 2014 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("TenantCtrl", [
        "$scope",
        "$rootScope",
        "$log",
        "$state",
        "$stateParams",
        "$ionicPopup",
        "DAO",
        function($scope, $rootScope, $log, $state, $stateParams, $ionicPopup, DAO) {
            var idAssociation = $stateParams.idAssociation;
            var idAp = $stateParams.idTenant;

            $scope.apart_info = DAO.payment.getApartmentsById(idAssociation,idAp);
            console.log("q",$scope.apart_info);

            $scope.pay = function() {
                $state.go("outgo", {
                    idAssociation: idAssociation,
                    idTenant: idAp,
                    idMonth: $scope.idLastMonth
                });
            }

        }
    ]);

}(angular.module("homefile")));