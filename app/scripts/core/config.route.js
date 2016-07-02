(function () {
    'use strict';


    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$authProvider', 'api_host', function($stateProvider, $urlRouterProvider, $authProvider, api_host) {
            var routes, setRoutes;

            routes = [
                'goethe/regions/list',
                'goethe/sliders/list',
                'goethe/pages/list',
                'goethe/translation/list',
                'goethe/competitions/list',
                'goethe/users/list',
                'goethe/participants/list',
                'goethe/contacts/list'
            ];

            setRoutes = function(route) {
                var config, url;
                url = '/' + route;
                config = {
                    url: url,
                    templateUrl: 'views/' + route + '.html',
                    resolve: {
                        loginRequired: loginRequired
                    }

                };
                $stateProvider.state(route, config);

                return $stateProvider;
            };

            routes.forEach(function(route) {
                return setRoutes(route);
            });


            $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/goethe/account/signin.html',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('region-view', {
                url: '/region-view/:regionId',
                templateUrl: 'views/goethe/regions/view.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('user-new', {
                url: '/user-new',
                templateUrl: 'views/goethe/users/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('user-edit', {
                url: '/user-edit/:userId',
                templateUrl: 'views/goethe/users/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('user-view', {
                url: '/user-view/:userId',
                templateUrl: 'views/goethe/users/view.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('participant-view', {
                url: '/participant-view/:userId',
                templateUrl: 'views/goethe/participants/view.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('region-new', {
                url: '/region-new',
                templateUrl: 'views/goethe/regions/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('region-edit', {
                url: '/region-edit/:regionId',
                templateUrl: 'views/goethe/regions/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('translation-list', {
                url: '/translation-list',
                templateUrl: 'views/goethe/translation/list.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('translation-new', {
                url: '/translation-new',
                templateUrl: 'views/goethe/translation/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('translation-edit', {
                url: '/translation-edit/:translationId',
                templateUrl: 'views/goethe/translation/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('page-edit', {
                url: '/page-edit',
                templateUrl: 'views/goethe/pages/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('slider-list', {
                url: '/slider-list',
                templateUrl: 'views/goethe/sliders/list.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('slider-new', {
                url: '/slider-new',
                templateUrl: 'views/goethe/sliders/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('slider-edit', {
                url: '/slider-edit/:sliderId',
                templateUrl: 'views/goethe/sliders/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('participant-new', {
                url: '/participant-new',
                templateUrl: 'views/goethe/participants/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('participant-edit', {
                url: '/participant-edit/:participantId',
                templateUrl: 'views/goethe/participants/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('competition-new', {
                url: '/competition-new/:regionId',
                templateUrl: 'views/goethe/competitions/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('competition-edit', {
                url: '/competition-edit/:competitionId',
                templateUrl: 'views/goethe/competitions/edit.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('competition-view', {
                url: '/competition-view/:competitionId',
                templateUrl: 'views/goethe/competitions/view.html',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .state('signin', {
                url: '/signup',
                templateUrl: 'views/goethe/account/signup.html',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            });

            $urlRouterProvider
                //.when('/', '/dashboard')
                .otherwise('/login');

            function skipIfLoggedIn($q, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    deferred.reject();
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }

            function loginRequired($q, $location, $auth) {
                var deferred = $q.defer();
                if ($auth.isAuthenticated()) {
                    deferred.resolve();
                } else {
                    $location.path('/login');
                }
                return deferred.promise;
            }

            //Satellizer
            $authProvider.baseUrl = api_host+'/';
            $authProvider.httpInterceptor = true;
            $authProvider.signupRedirect = null;

        

        }]
    );

})(); 
