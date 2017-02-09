// Directive for autoNumeric.js
// Require AngularJS, jQuery and autoNumeric.js
angular.module('crunch.ui.numeric', []).directive('crNumeric', [function () {
    'use strict';
    // Declare a empty options object
    var options = {};
    return {
        // Require ng-model in the element attribute for watching changes.
        require: '?ngModel',
        // This directive only works when used in element's attribute (e.g: cr-numeric)
        restrict: 'A',
        compile: function (tElm, tAttrs) {
            
            var isTextInput = tElm.is('input:text');

            return function (scope, elm, attrs, controller) {
                // Get instance-specific options.
                var opts = angular.extend({}, options, scope.$eval(attrs.crNumeric));
                
                // Helper method to update autoNumeric with new value.
                var updateElement = function (element, newVal) {
                    // Only set value if value is numeric
                    if ($.isNumeric(newVal))
                        element.autoNumeric('set', newVal);
                };    

                // Initialize element as autoNumeric with options.
                elm.autoNumeric(opts);
                
                // if element has controller, wire it (only for <input type="text" />)
                if (controller && isTextInput) {
                    // watch for external changes to model and re-render element
                    scope.$watch(tAttrs.ngModel, function (current, old) {
                        controller.$render();
                    });
                    // render element as autoNumeric
                    controller.$render = function () {
                        updateElement(elm, controller.$viewValue);
                    }
                    // Detect changes on element and update model.
                    elm.on('change', function (e) {
                        scope.$apply(function () {
                            controller.$setViewValue(elm.autoNumeric('get'));
                        });
                    });
                }
                else {
                    // Listen for changes to value changes and re-render element.
                    // Useful when binding to a readonly input field.
                    if (isTextInput) {
                        attrs.$observe('value', function (val) {
                            updateElement(elm, val);
                        });
                    }
                }
            }
        } // compile
    } // return
}]);