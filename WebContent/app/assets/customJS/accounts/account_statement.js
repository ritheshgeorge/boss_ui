var app = angular.module('bossApp');
app.controller('accountStatementCtrl',['$scope','$http' ,'AccountStatementService','AccountService','$state',function($scope,$http,AccountStatementService,AccountService,$state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.showAccountStatement = false;
	var statementList = AccountStatementService.accountStatement_list();/*.then(function(data) {
      console.log(data);
	});*/
	$scope.statementList = statementList;
	console.log($scope.statementList);
	
	
	// Paginations
	$scope.tableViewby = 10;
	$scope.tableTotalItems = statementList.length;
	$scope.tableCurrentPage = 1;
	$scope.tableItemsPerPage = $scope.tableViewby;

	$scope.setTableItemsPerPage = function(num) {
	  $scope.tableItemsPerPage = num;
	  $scope.tableCurrentPage = 1; //reset to first paghe
	}
}]);
