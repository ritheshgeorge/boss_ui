var app = angular.module('bossApp');
app.controller('paymentCtrl', ['$scope', '$http', '$state','ManagePayeeService','AccountService', function($scope,$http,$state,ManagePayeeService,AccountService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.paymentProcessed = false;
	$scope.numberOfDecimals = 2;
	$scope.today = new Date();
	$scope.pinVerified = false;
	$scope.payeeList = ManagePayeeService.payee_list();
	$scope.accountList = AccountService.getFromAccount();
	$scope.deliveryMethodList = AccountService.getDeliveryMethod();
	$scope.makePayment = function(){
		if(!$scope.paymentForm.$error.required){
			console.log($scope.payment);
			$scope.paymentProcessed = true;
		}else{
			$scope.formError = true;
		}
	}
	$scope.cancelPayment = function(){
		$scope.payment = undefined;
		$scope.paymentProcessed = false;
		$scope.formError = false;
	}
	
	
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