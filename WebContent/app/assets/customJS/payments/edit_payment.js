var app = angular.module('bossApp');
app.controller('editPaymentCtrl', ['$scope', '$http', '$state','$stateParams','ManagePayeeService','AccountService','PaymentService',
					function($scope,$http,$state,$stateParams,ManagePayeeService,AccountService,PaymentService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.numberOfDecimals = 2;
	$scope.pinVerified = false;
	$scope.paymentProcessed = false;
	$scope.payeeList = ManagePayeeService.payee_list();
	$scope.accountList = AccountService.getFromAccount();
	$scope.deliveryMethodList = AccountService.getDeliveryMethod();
	///////////////////////////////////////////////////
	//call back
	/*PaymentService.getPayment($stateParams.paymentId)
		.then(function(data) {});*/
	$scope.payment = PaymentService.getPayment($stateParams.paymentId);
	//iterate to find selected option
	angular.forEach($scope.accountList, function(value, index) {
		if (angular.equals(value.id, $scope.payment.fromAccountId)) {
						$scope.bankAccount = value;
					}
				});
	angular.forEach($scope.payeeList, function(value, index) {
		if (angular.equals(value.id, $scope.payment.payeeAccountId)) {
						$scope.payee = value.id;
					}
				});
	/////////////////////////////////////////////////
	console.log($scope.payment);
	console.log($scope.payeeList);
	/////////////////////////////
	
	
	
	console.log($scope.payment);
	$scope.indexOfObject = function indexOfObject(array, property, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][property] === value) return i;
		}
		return -1;
	};
	/* Date Picker */
	$scope.minDate = new Date();
	$scope.openPaymentDate = function($event){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.openPaymentCal = true;
	}
	
	$scope.makePayment = function(){
		/*if(!$scope.paymentForm.$error.required){
			console.log(JSON.stringify($scope.payment));
			$scope.paymentProcessed = true;
		}*/
		$state.go('home.makePayment');
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