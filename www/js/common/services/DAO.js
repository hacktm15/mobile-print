/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.factory("DAO", [
        "$rootScope",
        "localStorageService",
        function($rootScope, localStorageService) {
            var key = {
                auth: "auth",
                authCookie: "authCookie"
            };
            return {
                sync: function() {
                    this.auth.sync();
                },
                auth: {
                    sync: function() {
                        $rootScope.authInfo = localStorageService.get(key.auth);
                    },
                    set: function(authInfo) {
                        localStorageService.set(key.auth, authInfo);
                        $rootScope.authInfo = authInfo;
                    },
                    setCookie: function(auth) {
                        localStorageService.set(key.authCookie, auth);
                        $rootScope.authCookie = auth;
                    },
                    getCookie: function() {
                        return localStorageService.get(key.authCookie);
                    },
                    delete: function() {
                        localStorageService.remove(key.auth);
                        delete $rootScope.authInfo
                    },
                    getLastMonth: function(idAssociation) {
                        var obj = $rootScope.authInfo.admin[idAssociation].months;
                        return obj[obj.length - 1].idMonth;
                    }
                }
            }
        }]);

}(angular.module("homefile")));