/**
 * Copyright (C) 2014 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.controller("LoginController", function($scope) {
        $scope.data = {};

        $scope.login = function() {
            console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        }
    });

}(angular.module("homefile")));