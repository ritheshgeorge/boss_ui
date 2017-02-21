var app = angular.module('bossApp');
app.controller('paymentCtrl', ['$scope', '$http', '$state','ManagePayeeService','AccountService', function($scope,$http,$state,ManagePayeeService,AccountService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	
	$scope.pinVerified = false;
	$scope.payeeList = ManagePayeeService.payee_list();
	$scope.accountList = AccountService.getFromAccount();
	$scope.deliveryMethodList = AccountService.getDeliveryMethod();
	console.log($scope.deliveryMethodList);
	console.log();
	
	
	
	/**
		Two-Factor
	**/
	$scope.sendVerificationCode = function(method){
		console.log(method);
		//service call
		$scope.enterVerficationCode = true;
		$scope.pendingVerification = true;
	}
	$scope.verifyPin = function(pin){
		console.log(pin);
		//service call
		$scope.pinVerified = true;
	}
	
}]);