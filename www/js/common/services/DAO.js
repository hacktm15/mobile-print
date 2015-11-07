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
                authCookie: "authCookie",
                apartments: "apartments"
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

                        if ($rootScope.authInfo) {
                            var associations = $rootScope.authInfo.admin;
                            var self = this;

                            for (var idAssociation in associations) {
                                //
                                // TODO: synch method
                                //
                                if ( ! this.getApartments( idAssociation ) ) {

                                    var getPaymentData = function(idAss) {
                                        PaymentDocument.getPaymentData(idAssociation).then(
                                            function success(res) {
                                                if (res.status === 200 && res.data.apData ) {
                                                    self.savePaymentInfo(idAss, res.data);
                                                } else {
                                                    $log.info("No data about payments");
                                                }
                                            },
                                            function error() {
                                                $log.error("Failed to sync association " + idAssociation + " payment data");
                                            }
                                        );
                                    };
                                    //
                                    // Create separate scope to hold idAssociation
                                    //
                                    getPaymentData(idAssociation);
                                }
                            }
                        }
                    },
                    savePaymentInfo: function(idAssociation, data) {
                        var apartments = this._processData(data);
                        localStorageService.set(key.apartments+ "_" + idAssociation, apartments);
                    },
                    getApartments: function(idAssociation) {
                        return localStorageService.get(key.apartments + "_" + idAssociation);
                    },
                    _processData: function(data) {
                        var apartments = data.apData,
                            groups = data.agData,
                            funds = data.fundAps;

                        var getGroupKey = function(idEntrance, key) {
                            var gr;
                            for (var i = 0; i < groups.length; i++) {
                                gr = groups[i];
                                if (gr.idEntrance === idEntrance ) {
                                    return gr[key];
                                }
                            }
                        };

                        var getFund = function(idAp, key) {
                            for (var i = 0; i < funds.length; i++) {
                                var fund = funds[i];
                                if (fund.idAp = idAp) {
                                    return fund[key];
                                }
                            }
                        };

                        var result = [],
                            apartment;

                        for (var i = 0; i < apartments.length; i++) {
                            var ap = apartments[i];
                            apartment = {
                                amount: ap.a,
                                tenantName: ap.tn,
                                penalties: ap.p,
                                remaining: ap.r,

                                apartmentNumber: ap.n,
                                blockNumber: getGroupKey(ap.idE, "block"),
                                entranceNumber: getGroupKey(ap.idE, "entrance"),

                                fundBalance: getFund(ap.idAp, "b"),
                                fundDepth: getFund(ap.idAp, "d")
                            };

                            result.push(apartment);
                        }
                        return result;
                    }
                    //,
                    //getPaymentInfo: function (idApartment) {
                    //
                    //}
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