var app = angular.module('bossApp');
app.controller('paymentActivityCtrl', ['$scope', '$http', '$state','ManagePayeeService','AccountSummaryService','PaymentActivityService',
function($scope, $http,$state,ManagePayeeService, AccountSummaryService,PaymentActivityService) {
	$scope.loadingTable1 = true;
	$scope.loadingTable2 = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $scope.today = new Date();
	ManagePayeeService.payee_list().then(function(data) {
        $scope.payeeList = data;
	});
	
	AccountSummaryService.bankAccount_list().then(function(data) {
		$scope.accountList = data;
	  
		/*
		* Scheduled Payments Table
		*/
		PaymentActivityService.paymentActivity_list().then(function(response){
			
			var data = response.data;
			var activityList = [];
			for(var i in data){ 
				var p_from_index =  $scope.indexOfObject( $scope.accountList,'id' , data[i].fromAccountId);
				var p_to_index =  $scope.indexOfObject( $scope.payeeList,'id' , data[i].payeeAccountId);
				data[i].toAccount_name = $scope.payeeList[p_to_index].legalName;
				data[i].fromAccount_name = $scope.accountList[p_from_index].nicName;
				activityList.push(data[i]);
			}
			$scope.paymentActivityList = activityList;
			//$scope.recentPaymentActivityList = activityList;
			console.log("----payment activity list----");
			console.log(activityList);
			
			
		//pagination
		$scope.tableViewby = 10;
		$scope.tableTotalItems = response.length;
		$scope.tableCurrentPage = 1;
		$scope.tableItemsPerPage = $scope.tableViewby;
		$scope.loadingTable1 = false;
		});
	});
	
	
	
	
	/*
	*  Recent Payment Table
	*/
	
    PaymentActivityService.paymentActivity_list().then(function(response) {
		
		
		//$scope.recentPaymentActivityList = response.data;
	
		  
		  
    //Recent Payment Paginations
	$scope.recentTableViewby = 5;
    $scope.recentTableTotalItems = response.data.length;
    $scope.recentTableCurrentPage = 1;
    $scope.recentTableItemsPerPage = $scope.recentTableViewby;
	$scope.loadingTable2 = false;
	});
    
	/*
	* Common Functions used for pagination
	*/
    $scope.setTableItemsPerPage = function(num) {
        $scope.tableItemsPerPage = num;
        $scope.tableCurrentPage = 1; //reset to first paghe
    }
	$scope.setRecentPaymentListTableItemsPerPage = function(num) {
        $scope.recentTableItemsPerPage = num;
        $scope.recentTableCurrentPage = 1; //reset to first paghe
    }
	
	/**********************************/
	$scope.indexOfObject = function indexOfObject(array, property, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][property] === value) return i;
		}
		return -1;
	};
}]);