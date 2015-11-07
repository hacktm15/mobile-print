/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.factory("Apartments", [
        "$http",
        "Constants",
        "DAO",
        function($http, Constants, DAO) {
            return {
                get: function(idAssociation) {
                    return $http({
                        method: "GET",
                        url: Constants.hfEndpoint + "/api/association/" + idAssociation + "/apartments",
                        headers: { authorization: DAO.auth.getCookie() }
                    });
                }
            };
        }])

}(angular.module("homefile")));