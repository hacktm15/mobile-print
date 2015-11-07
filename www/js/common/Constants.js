/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function(app) {
    'use strict';

    app.constant('Constants', {
        env: "dev",         // dev and prod
        hfEndpoint: 'https://homefile.ro'
        //hfEndpoint: 'http://localhost:8100'
    });

}(angular.module("homefile")));