/**
 * Copyright (C) 2014 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("LoginCtrl", [
        "$scope",
        "$rootScope",
        "$state",
        "$ionicPopup",
        "Auth",
        "DAO",
        function($scope, $rootScope, $state, $ionicPopup, Auth, DAO) {
            $scope.data = {};

            $scope.login = function() {

                Auth.login($scope.data.username, $scope.data.password).then(
                    function success(res) {
                        if (res.data.isAdmin) {
                            DAO.auth.set(res.data);

                            var authHeader = res.headers().authorization;
                            //var obj = authHeader.split("Bearer ");

                            DAO.auth.setCookie(authHeader);

                            $state.go("associations");
                        } else {
                            //
                            // Not admin
                            //
                            $ionicPopup.alert({
                                title: 'Eroare',
                                template: 'Doar administratorii homefile pot folosi aplicatia'
                            });
                        }
                    },
                    function error() {
                        $scope.showAlert = function() {
                            $ionicPopup.alert({
                                title: 'Eroare',
                                template: 'Verifica numele de utilizator si parola'
                            });
                        };
                    }
                );
            }
        }
    ]);

}(angular.module("homefile")));