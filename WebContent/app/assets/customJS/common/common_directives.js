var boss_common_module = angular.module('bossApp');
/*
* Instructions to use the below directive: 

*/
boss_common_module.directive('numberFormat', ['$filter', '$parse', function ($filter, $parse) {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelController) {
		var decimals = $parse(attrs.decimals)(scope);
		ngModelController.$parsers.push(function (data) {
        var parsed = parseFloat(data);
        return !isNaN(parsed) ? parsed : '';
      });
      ngModelController.$formatters.push(function (data) {
        return $filter('number')(data, decimals); //converted
      });
		element.bind('focus', function () {
        element.val(ngModelController.$modelValue);
      });
		element.bind('blur', function () {
        var formatted = $filter('number')(ngModelController.$modelValue, decimals);
        element.val(formatted);
      });
    }
  }
}]);