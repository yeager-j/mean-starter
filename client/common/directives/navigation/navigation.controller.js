/**
 * Created by Jackson on 9/30/16.
 */

(function () {
    navController.$inject = ['$location', '$route', '$scope', '$mdSidenav', '$mdToast', 'authentication', 'fetchUser'];
    function navController($location, $route, $scope, $mdSidenav, $mdToast, authentication, fetchUser) {
        $scope.user = {
            username: 'Guest'
        };

        $scope.school = {};

        $scope.toggleSidenav = function () {
            $mdSidenav('navigation').toggle();
        };

        $scope.toggleUsernav = function () {
            $mdSidenav('userNav').toggle();
        };

        $scope.logout = function () {
            authentication.logout();
            $location.path('/');
            $mdToast.show(
                $mdToast.simple()
                    .textContent('You have successfully logged out.')
                    .hideDelay(3000)
            )
        };

        $scope.$watch(function () {
            return authentication.getToken();
        }, function (newValue, oldValue) {
            $scope.userNav = [];

            if (authentication.isLoggedIn()) {
                $scope.userNav = [];
                $scope.userNav.push({
                        icon: 'person',
                        location: 'Your Profile',
                        path: '#/profile/' + $scope.user.username
                    });

                fetchUser.getCurrentUser(function (user) {
                    $scope.user = user;
                    
                    if ($scope.user.rank === 3) {
                        $scope.userNav.push({
                            icon: 'dashboard',
                            location: 'Admin Panel',
                            path: '#/blogs'
                        });
                    }

                    $scope.userNav[0].path = '#/profile/' + $scope.user.username;
                })
            } else {
                $scope.userNav = [];
                $scope.userNav.push({
                        icon: 'exit_to_app',
                        location: 'Login',
                        path: '#/login'
                    },
                    {
                        icon: 'person_add',
                        location: 'Register',
                        path: '#/register'
                    });

                $scope.user = {
                    username: 'Guest'
                }
            }

            $scope.isLoggedIn = authentication.isLoggedIn();
        });

        $scope.nav = [
            {
                icon: 'home',
                location: 'Home',
                path: '#/'
            },
            {
                icon: 'group',
                location: 'Members',
                path: '#/members'
            }
        ];
    }

    angular.module('starterkit')
        .controller('navCtrl', navController)
})();