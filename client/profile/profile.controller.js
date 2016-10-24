/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'fetchUser', '$routeParams'];
    function profileController($scope, fetchUser, $routeParams) {
        $scope.user = {};

        fetchUser.getUser($routeParams.user, function (response) {
            $scope.user = response;
        });
    }

    angular.module('starterkit')
        .controller('profileCtrl', profileController)
})();