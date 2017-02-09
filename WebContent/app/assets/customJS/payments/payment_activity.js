var app = angular.module('bossApp');
app.controller('paymentActivityCtrl', ['$scope', '$http', 'PaymentActivityService', '$state', function($scope, $http, PaymentActivityService, $state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    var data = PaymentActivityService.paymentActivity_list();
    /*.then(function(data) {
          console.log(data);
    	});*/
    console.log(data);
    $scope.paymentActivityList = data.paymentActivity;

    //pagination
    $scope.tableViewby = 10;
    $scope.tableTotalItems = data.paymentActivity.length;
    $scope.tableCurrentPage = 1;
    $scope.tableItemsPerPage = $scope.tableViewby;

    $scope.setTableItemsPerPage = function(num) {
        $scope.tableItemsPerPage = num;
        $scope.tableCurrentPage = 1; //reset to first paghe
    }
	
	
}]);