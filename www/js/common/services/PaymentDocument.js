/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.factory("PaymentDocument", [
        "$http",
        "$rootScope",
        "Constants",
        function($http, $rootScope, Constants) {
            return {
                getPaymentData : function(idAssociation){
                    return $http({
                        method: "GET",
                        url: Constants.hfEndpoint + "/api/association/" + idAssociation + '/paymentData',
                        headers: { authorization: $rootScope.authCookie }
                    });
                }
            }
        }])

}(angular.module("homefile")));