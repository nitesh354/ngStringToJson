(function (angular) {
    var myModule = angular.module('ngStringToJson', []);

    myModule.directive('ngStringToJson', [function () {
        return {
            restrict: 'EA',
            scope: {},
            require: 'ngModel',
            controller: ['$scope', function ($scope) {

            }],
            link: function (scope, elem, attr, ctrl) {

            }
        };
    }]);

    myModule.directive('nmArray', [function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '[?^ngStringToJson, ?^nmArray, ?^nmObject, ?^nmData]',
            controller: ['$scope', function ($scope) {

            }],
            link: function (scope, elem, attr, ctrl) {

            }
        };
    }]);

    myModule.directive('nmObject', [function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '[?^ngStringToJson, ?^nmArray, ?^nmObject, ?^nmData]',
            controller: ['$scope', function ($scope) {

            }],
            link: function (scope, elem, attr, ctrl) {

            }
        };
    }]);

    myModule.directive('nmData', [function () {
        return {
            restrict: 'EA',
            scope: {},
            require: '[?^ngStringToJson, ?^nmArray, ?^nmObject, ?^nmData]',
            controller: ['$scope', function ($scope) {

            }],
            link: function (scope, elem, attr, ctrl) {

            }
        };
    }]);
})(angular);
