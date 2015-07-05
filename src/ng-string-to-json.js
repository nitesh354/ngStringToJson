(function (angular) {
    var myModule = angular.module('ngStringToJson', []);

    myModule.directive('ngStringToJson', [function () {
        return {
            restrict: 'EA',
            scope: {},
            require: 'ngModel',
            controller: ['$scope', function ($scope) {
                $scope.data = undefined;
                this.setData = function (value) {
                    $scope.data = angular.copy(value);
                };
            }],
            link: function (scope, elem, attr, ctrl) {
                scope.update = function (value) {
                    ctrl.$setViewValue(value);
                };
                scope.$watch('data', scope.update);
            }
        };
    }]);

    myModule.directive('nmArray', ['$log', 'nmGetParentCtrl', function ($log, nmGetParentCtrl) {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.data = [];
                this.setData = function (value) {
                    $scope.data.push(angular.copy(value));
                };
            }],
            link: function (scope, elem, attr, ctrl) {
                var ngStringToJsonCtrl = nmGetParentCtrl(elem, 'ngStringToJson');
                var nmArrayCtrl = nmGetParentCtrl(elem, 'nmArray');
                var nmObjectCtrl = nmGetParentCtrl(elem, 'nmObject');
                var nmDataCtrl = nmGetParentCtrl(elem, 'nmData');
                scope.update = function (value) {
                    if (angular.isDefined(ngStringToJsonCtrl)) {
                        ngStringToJsonCtrl.setData(scope.data);
                    } else if (angular.isDefined(nmArrayCtrl)) {
                        nmArrayCtrl.setData(scope.data);
                    } else if (angular.isDefined(nmObjectCtrl)) {
                        $log.error('Invalid hierarchy :: nm-array couldn\'t have nm-object as parent.');
                    } else if (angular.isDefined(nmDataCtrl)) {
                        nmDataCtrl.setData(scope.data);
                    }
                };
                scope.$watchCollection('data', scope.update);
            }
        };
    }]);

    myModule.directive('nmObject', ['$log', 'nmGetParentCtrl', function ($log, nmGetParentCtrl) {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.data = {};
                this.setData = function (key, value) {
                    $scope.data[key] = angular.copy(value);
                };
            }],
            link: function (scope, elem, attr, ctrl) {
                var ngStringToJsonCtrl = nmGetParentCtrl(elem, 'ngStringToJson');
                var nmArrayCtrl = nmGetParentCtrl(elem, 'nmArray');
                var nmObjectCtrl = nmGetParentCtrl(elem, 'nmObject');
                var nmDataCtrl = nmGetParentCtrl(elem, 'nmData');
                scope.update = function (value) {
                    if (angular.isDefined(ngStringToJsonCtrl)) {
                        ngStringToJsonCtrl.setData(scope.data);
                    } else if (angular.isDefined(nmArrayCtrl)) {
                        nmArrayCtrl.setData(scope.data);
                    } else if (angular.isDefined(nmObjectCtrl)) {
                        $log.error('Invalid hierarchy :: nm-object couldn\'t have nm-object as parent.');
                    } else if (angular.isDefined(nmDataCtrl)) {
                        nmDataCtrl.setData(scope.data);
                    }
                };
                scope.$watchCollection('data', scope.update);
            }
        };
    }]);

    myModule.directive('nmData', ['$log', 'nmGetParentCtrl', function ($log, nmGetParentCtrl) {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.key = undefined;
                $scope.value = undefined;
                this.setData = function (value) {
                    $scope.value = angular.copy(value);
                };
            }],
            link: function (scope, elem, attr, ctrl) {
                var ngStringToJsonCtrl = nmGetParentCtrl(elem, 'ngStringToJson');
                var nmArrayCtrl = nmGetParentCtrl(elem, 'nmArray');
                var nmObjectCtrl = nmGetParentCtrl(elem, 'nmObject');
                var nmDataCtrl = nmGetParentCtrl(elem, 'nmData');
                scope.key = attr.key;
                scope.value = scope.value || attr.value;
                scope.update = function (value) {
                    if (angular.isDefined(ngStringToJsonCtrl)) {
                        ngStringToJsonCtrl.setData(scope.value);
                    } else if (angular.isDefined(nmArrayCtrl)) {
                        nmArrayCtrl.setData(scope.value);
                    } else if (angular.isDefined(nmObjectCtrl)) {
                        nmObjectCtrl.setData(scope.key, scope.value);
                    } else if (angular.isDefined(nmDataCtrl)) {
                        $log.error('Invalid hierarchy :: nm-data couldn\'t have nm-data as parent.');
                    }
                };
                scope.$watch('value', scope.update);
            }
        };
    }]);

    myModule.factory('nmGetParentCtrl', function () {
        var toSnakeCase = function (camelCaseString) {
            return camelCaseString.replace(/([A-Z])/g, function ($1) {
                return "-" + $1.toLowerCase();
            });
        };
        var hasAttr = function (elem, attr) {
            if (angular.isDefined(elem.attr(toSnakeCase(attr)))) {
                return true;
            } else {
                return false;
            }
        };
        var _getParentCtrl = function (elem, type) {
            if (elem && type) {
                var parentElem = elem.parent() || undefined;
                var parentElemCtrl = (parentElem && hasAttr(parentElem, type) && parentElem.controller(type)) || undefined;

                return parentElemCtrl;
            } else {
                return undefined;
            }
        };

        return _getParentCtrl;
    });
})(angular);
