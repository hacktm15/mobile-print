/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function (app) {
    'use strict';

    app.factory("Auth", [
        "$http",
        "Constants",
        function ($http, Constants) {
            return {
                login: function (user, pass) {
                    return $http.post(
                        Constants.hfEndpoint + "/api/auth/login",
                        {
                            email: user,
                            password: pass,
                            remember: true
                        });
                },
                logout: function () {
                    return $http.post(Constants.hfEndpoint + "/api/auth/logout");
                }
            };
        }])

}(angular.module("homefile")));