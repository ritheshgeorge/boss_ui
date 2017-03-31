var boss_common_module = angular.module('bossApp');

boss_payment_module.directive('downloadDocument', ['$cookies', function($cookies) {
      return {
          restrict: 'EA',
          template: '<a target="_blank" href="'+$cookies.path+'payment/downloadDocumnet?documentJSON={{row}}"'+ 'class="btn btn-xs btn-primary" title="">Download</a>'
      };
  }]);