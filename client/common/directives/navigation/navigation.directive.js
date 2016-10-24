/**
 * Created by Jackson on 9/30/16.
 */

(function () {
    function navigation() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigation/navigation.template.html',
            controller: 'navCtrl'
        }
    }

    angular.module('starterkit')
        .directive('navigation', navigation)
})();