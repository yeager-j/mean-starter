(function () {
    editProfile.$inject = ['$scope', '$mdDialog', 'authentication', 'fetchUser', '$location', '$mdToast'];
    function editProfile($scope, $mdDialog, authentication, fetchUser, $location, $mdToast) {
        $scope.user = {};

        $scope.edit = function () {
            authentication.edit({
                username: $scope.user.username,
                fullname: $scope.user.fullname,
                email: $scope.user.email
            }).then(function (response) {
                $location.path('/profile/' + $scope.user.username);
                authentication.saveToken(response.data.token);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                );
                $mdDialog.cancel();
            }, function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(response.data.message)
                )
            })
        };

        fetchUser.getCurrentUser(function (response) {
            $scope.user = response;
        });
    }

    angular.module('starterkit')
        .controller('editCtrl', editProfile)
})();