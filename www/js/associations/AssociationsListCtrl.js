/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("AssociationsListCtrl", [
        "$scope",
        "$rootScope",
        "$state",
        "$ionicPopup",
        "Auth",
        "DAO",
        function($scope, $rootScope, $state, $ionicPopup, Auth, DAO) {
            DAO.auth.sync();

            if ( ! $rootScope.authInfo ) {
                $state.go("login");
            }
            /**
             * Logout button
             */
            $scope.logout = function() {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Logout',
                    template: 'Sigur vreți să părăsiți aplicația?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        Auth.logout().then(
                            function success(res) {
                                if ( res.data === "OK" ) {
                                    DAO.auth.delete();
                                    $state.go("login");
                                } else {
                                    $ionicPopup.alert({
                                        title: 'Eroare',
                                        template: 'Logout nu a reusit. Incercati mai tarziu'
                                    });
                                }
                            },
                            function error() {
                                $ionicPopup.alert({
                                    title: 'Eroare',
                                    template: 'Logout nu a reusit. Incercati mai tarziu'
                                });
                            }
                        );
                    } else {
                        console.log('You are not sure');
                    }
                });
            }
        }
    ]);

}(angular.module("homefile")));