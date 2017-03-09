var app = angular.module('bossApp');
app.controller('accountSummaryCtrl',['$scope','$http' ,'AccountSummaryService','AccountService','$state',function($scope,$http,AccountSummaryService,AccountService,$state) {
	$scope.loading = true;
	$scope.viewAllAccountActivity=false;
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.showAccountStatement = false;
	AccountSummaryService.bankAccount_list().then(function(data) {
      $scope.accountList = data;
	  $scope.loading = false;
	});
	$scope.viewAllActivityForThisAccount = function(account){
		AccountService.emptyList();
		AccountService.add(account); 
		var list = AccountService.getList();
		//after adding route to viewAll account activity  ui-sref="accountActivity"
		$scope.viewAllAccountActivity=true;
	}
	
	
}]);
