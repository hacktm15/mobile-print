/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.factory("DAO", [
        "$rootScope",
        "$log",
        "localStorageService",
        "PaymentDocument",
        function($rootScope, $log, localStorageService, PaymentDocument) {
            var key = {
                auth: "auth",
                authCookie: "authCookie"
            };
            return {
                sync: function() {
                    this.auth.sync();
                    //
                    // Sync payment data if logged in
                    //
                    this.payment.sync();
                },
                payment: {
                    sync: function() {
                        var associations = $rootScope.authInfo.admin;

                        for (var idAssociation in associations) {
                            console.log(idAssociation);
                            //
                            // TODO: synch method
                            //
                            if ( ! this.getApartments( idAssociation ) ) {
                                PaymentDocument.getPaymentData(idAssociation).then(
                                    function success(res) {
                                        console.log(res.data);
                                    },
                                    function error() {
                                        $log.error("Failed to sync association " + idAssociation + " payment data");
                                    }
                                );
                            }
                        }
                    },
                    getApartments: function(idAssociation) {

                    },
                    getPaymentInfo: function (idApartment) {

                    }
                },
                auth: {
                    sync: function() {
                        $rootScope.authInfo = localStorageService.get(key.auth);
                        $rootScope.authCookie = localStorageService.get(key.authCookie);
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