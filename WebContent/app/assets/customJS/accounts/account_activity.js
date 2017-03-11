var app = angular.module('bossApp');
app.controller('accountActivityCtrl', ['$scope', '$http','$state','$stateParams','TransactionService', 
	function($scope, $http,$state,$stateParams,TransactionService) {
	$scope.loading = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.noRecordMsg = "No records available to display.";
   
   TransactionService.getTransactionList($stateParams.accountId).then(function(response){
	   
	   
	   
	   //bankAccount
	   $scope.bankAccount = response.data.account;
	   $scope.accountActivity = response.data.activityList;
	   // Paginations
		$scope.tableViewby = 10;
		$scope.tableTotalItems = $scope.accountActivity.length;
		$scope.tableCurrentPage = 1;
		$scope.tableItemsPerPage = $scope.tableViewby;

		$scope.setTableItemsPerPage = function(num) {
		  $scope.tableItemsPerPage = num;
		  $scope.tableCurrentPage = 1; //reset to first paghe
		}
	   $scope.loading= false;
   });
   
   
   // Account Object
   // Transaction List
   
   
   
   
   
   
   
   
   
   
   
   
}]);