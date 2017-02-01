var app = angular.module('bossApp');
app.controller('accountSummaryCtrl',['$scope','$http' ,'AccountSummaryService','AccountService','$state',function($scope,$http,AccountSummaryService,AccountService,$state) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.showAccountStatement = false;
	var accountList = AccountSummaryService.bankAccount_list();/*.then(function(data) {
      console.log(data);
	});*/
	$scope.accountList = accountList;
	$scope.viewAllActivityForThisAccount = function(account){
		AccountService.emptyList();
		AccountService.add(account); 
		var list = AccountService.getList();
		//after adding route to viewAll account activity  ui-sref="accountActivity"
		$state.go('accountActivity');
	}
	
	
}]);
