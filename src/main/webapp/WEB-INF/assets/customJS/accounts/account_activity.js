var app = angular.module('bossApp');
app.controller('accountActivityCtrl', ['$scope', '$http', 'AccountActivityService','AccountService','$state', function($scope, $http, AccountActivityService,AccountService,$state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.noRecordMsg = "No records available to display.";
    var data = AccountActivityService.accountActivity_list();
    /*.then(function(data) {
          console.log(data);
    	});*/
    $scope.account = data.account;
    $scope.accountActivity = data.accountActivity;
    var account = AccountService.getList();
	console.log(account);
	console.log($scope.account);
	
	// Paginations
	$scope.tableViewby = 10;
	$scope.tableTotalItems = data.accountActivity.length;
	$scope.tableCurrentPage = 1;
	$scope.tableItemsPerPage = $scope.tableViewby;

	$scope.setTableItemsPerPage = function(num) {
	  $scope.tableItemsPerPage = num;
	  $scope.tableCurrentPage = 1; //reset to first paghe
	}
}]);