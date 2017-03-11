var app = angular.module('bossApp');
app.controller('manageUserCtrl', ['$scope', '$http', '$state','UserNewEditService', function($scope, $http, $state,UserNewEditService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.loadingTable = true;
    
	UserNewEditService.getUserList("").then(function(response){
		$scope.userList = response.data;
		$scope.loadingTable = false;
	});
	
	//pagination
	$scope.tableViewby = 10;
	$scope.tableTotalItems = ($scope.payeeList!=undefined)?$scope.payeeList.length:0; 
	$scope.tableCurrentPage = 1;
	$scope.tableItemsPerPage = $scope.tableViewby;



	$scope.setTableItemsPerPage = function(num) {
	$scope.tableItemsPerPage = num;
	$scope.tableCurrentPage = 1; //reset to first paghe
}
	
}]);