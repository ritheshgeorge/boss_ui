var app = angular.module('bossApp');
app.controller('managePayeeCtrl', ['$scope', '$http', 'ManagePayeeService', '$state', function($scope, $http, ManagePayeeService, $state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.loadingTable = true;
    ManagePayeeService.payee_list().then(function(data) {
        $scope.payeeList = data;
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