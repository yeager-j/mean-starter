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

        $scope.editProfile = function(){
            $mdDialog.show(
                $mdDialog.alert()
                    .textContent('You edited your profile')
                    .title('Edit Profile')
                    .ok('Great!')
            )
        }
    }

    angular.module('starterkit')
        .controller('profileCtrl', profileController)
})();