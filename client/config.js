(function () {
    angular.module('starterkit')
        .config(config);

    config.$inject = ['$routeProvider', '$mdThemingProvider'];
    function config($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(false);
                    }]
                }
            })

            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.shouldBeLoggedIn(false);
                    }]
                }
            })

            .when('/members', {
                templateUrl: 'members/members.view.html',
                controller: 'MemberController',
                controllerAs: 'vm',
                resolve: {
                    access: ['Access', function (Access) {
                        return Access.hasPermission(2);
                    }]
                }
            })

            .when('/profile/:user', {
                templateUrl: '/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })

            .otherwise({
                redirectTo: '/'
            });

        $mdThemingProvider
            .theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('grey');
    }
})();
