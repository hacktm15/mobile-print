/**
 * Copyright (C) 2014-2015 Home Administration Solutions SRL-D, All Rights Reserved
 */

(function() {
    'use strict';

    angular.module('homefile', [
        'ionic',
        'LocalStorageModule'
    ])
        .run(function ($ionicPlatform, DAO) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

                DAO.sync();
            });
        })
        .config(function($logProvider, Constants){
            if ( Constants.env === "dev" ) {
                //
                // Allow debug messages
                //
                $logProvider.debugEnabled(false);
            }
        })
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('hf')
                .setStorageType('localStorage')
                .setNotify(false, false);
        })
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url : '/login',
                    templateUrl : 'js/login/login.html',
                    controller : 'LoginCtrl'
                })
                .state('associations', {
                    url : '/associations',
                    templateUrl : 'js/associations/associationsList.html',
                    controller : 'AssociationsListCtrl'
                })
                .state('tenants', {
                    url : '/association/:idAssociation/tenants',
                    templateUrl : 'js/tenants/tenants.html',
                    controller : 'TenantsCtrl',
                    resolve: {
                        apartments: function(DAO, $stateParams) {
                            var result = DAO.payment.getApartments($stateParams.idAssociation);
                            return result;
                        }
                    }
                })
                .state('tenant', {
                    url : '/association/:idAssociation/tenants/:idTenant',
                    templateUrl : 'js/tenants/tenant.html',
                    controller : 'TenantCtrl'
                })
                .state('outgo', {
                    url : '/association/:idAssociation/tenants/:idTenant/month/:idMonth/outgo',
                    templateUrl : 'js/outgo/outgo.html',
                    controller : 'OutgoCtrl'
                });

            $urlRouterProvider.otherwise('/associations');
        });

}());

