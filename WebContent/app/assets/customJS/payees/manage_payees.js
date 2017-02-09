var app = angular.module('bossApp');
app.controller('managePayeeCtrl', ['$scope', '$http', 'ManagePayeeService', '$state', function($scope, $http, ManagePayeeService, $state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    var data = ManagePayeeService.payee_list();
    /*.then(function(data) {
          console.log(data);
    	});*/
    console.log(data);
	$scope.payeeList = data;
	
	//pagination
	$scope.tableViewby = 10;
	$scope.tableTotalItems = data.length; 
	$scope.tableCurrentPage = 1;
	$scope.tableItemsPerPage = $scope.tableViewby;



	$scope.setTableItemsPerPage = function(num) {
	$scope.tableItemsPerPage = num;
	$scope.tableCurrentPage = 1; //reset to first paghe
}
	
}]);