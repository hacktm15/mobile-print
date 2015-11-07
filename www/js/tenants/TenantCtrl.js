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
        "Outgo",
        "DAO",
        function($scope, $rootScope, $log, $state, $stateParams, $ionicPopup, Outgo, DAO) {
            var idAssociation = $stateParams.idAssociation;
            var idAp = $stateParams.idTenant;

            Outgo.get(idAssociation, idAp).then(
                function success(res) {
                    if (res.data) {

                        var idMonth = DAO.auth.getLastMonth(idAssociation);
                        var bills = res.data.bills;

                        var lastBill = bills[bills.length - 1];

                        if (lastBill.idMonth != idMonth ) {

                        }
                        $scope.idLastMonth = idMonth;
                        $scope.lastBill = lastBill;
                    }
                },
                function error() {
                    $log.error("Could not get outgo");
                }
            );

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