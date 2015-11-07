/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.factory("Outgo", [
        "$http",
        "Constants",
        "DAO",
        function($http, Constants, DAO) {
            return {
                get: function (idAssociation, idAp) {
                    return $http({
                        method: "GET",
                        url: Constants.hfEndpoint + "/api/association/" + idAssociation + "/apartment/" + idAp + "/outgoHistory",
                        headers: { authorization: DAO.auth.getCookie() }
                    });
                }
            }

        }])

}(angular.module("homefile")));