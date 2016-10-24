/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    registerController.$inject = ['$scope', '$location', 'authentication', '$mdToast'];
    function registerController($scope, $location, authentication, $mdToast) {
        $scope.user = {};

        $scope.register = function () {
            authentication.register($scope.user, function (response) {
                if (response.status == 200) {
                    $location.path('/');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('You have successfully registered!')
                            .hideDelay(3000)
                    )
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(response.data.message)
                            .hideDelay(3000)
                    )
                }
            })
        };
    }

    angular.module('starterkit')
        .controller('registerCtrl', registerController)
})();