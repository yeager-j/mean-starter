/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    profileController.$inject = ['$scope', 'fetchUser', '$routeParams', '$mdDialog'];
    function profileController($scope, fetchUser, $routeParams, $mdDialog) {
        $scope.user = {};

        fetchUser.getUser($routeParams.user, function (response) {
            $scope.user = response;
        });

        $scope.editProfile = function () {
            $mdDialog.show({
                templateUrl: 'profile/edit/edit.template.html',
                controller: 'editCtrl',
                clickOutsideToClose: true
            })
        }
    }

    angular.module('starterkit')
        .controller('profileCtrl', profileController)
})();