var app = angular.module('bossApp');
app.controller('editPaymentCtrl', ['$scope', '$http', '$state','$stateParams','PaymentService','ManagePayeeService','AccountSummaryService','AccountService',
					function($scope,$http,$state,$stateParams,PaymentService,ManagePayeeService,AccountSummaryService,AccountService) {
	$scope.loading = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.numberOfDecimals = 2;
	$scope.pinVerified = false;
	$scope.paymentProcessed = false;
	
	
	
	PaymentService.getPayment($stateParams.paymentId).then(function(response){
			$scope.payment = response.data.payment;
		//Load From and to accounts
		ManagePayeeService.payee_list().then(function(ps_data) {
        $scope.payeeList = ps_data;
			AccountSummaryService.bankAccount_list().then(function(as_data) {
			  $scope.accountList = as_data;
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
			  $scope.loading = false; 
			});
		});
		
	
	});
	$scope.deliveryMethodList = AccountService.getDeliveryMethod();
	
	
	
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
		var _payment = $scope.payment;
		PaymentService.make_payment(_payment).then(function(data){
			$state.go('home.makePayment.paymentActivity');
		});
		//$state.go('home.makePayment');
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