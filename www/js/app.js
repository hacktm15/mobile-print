/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function() {
    'use strict';

    angular.module('homefile', ['ionic'])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function($logProvider, Constants){
            if ( ! Constants.env.dev ) {
                //
                // Allow debug messages
                //
                $logProvider.debugEnabled(false);
            }
        })
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url : '/login',
                    templateUrl : 'js/login/login.html',
                    controller : 'LoginController'
                });

            $urlRouterProvider.otherwise('/login');
        });

}());

