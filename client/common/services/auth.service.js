/**
 * Created by Jackson on 10/20/16.
 */

(function () {
    authService.$inject = ['$http', '$window', '$route'];
    function authService($http, $window, $route) {
        this.saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        this.getToken = function () {
            return $window.localStorage['mean-token']
        };

        this.logout = function () {
            console.log("loggin out");
            $window.localStorage.removeItem('mean-token')
        };

        this.isLoggedIn = function () {
            var token = this.getToken();
            var payload;
            if (token) {
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        this.uuid = function () {
            if (this.isLoggedIn()) {
                var token = this.getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    uuid: payload._id
                };
            }
        };

        this.register = function (user, callback) {
            var auth = this;

            return $http.post('/api/register', user).then(function (response) {
                auth.saveToken(response.data.token);
                $route.reload();
                callback(response);
            }, function (response) {
                callback(response);
            })
        };

        this.login = function (user, callback) {
            var auth = this;

            return $http.post('/api/login', user).then(function (response) {
                auth.saveToken(response.data.token);
                $route.reload();
                callback(response);
            }, function (response) {
                callback(response);
            })
        };

        this.getUser = function (uid) {
            return $http.get('/api/get_user/' + uid);
        };

        this.getUsers = function () {
            return $http.get('/api/get_users');
        }
    }

    angular.module('starterkit')
        .service('authentication', authService)
})();