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
	$scope.paymentFrequency= "oneTime";
	var payment = {
		paymentDate : new Date(),
		fromAccountId : '',
		payeeAccountId : '',
		paymentAmount : undefined,
		paymentNotes : '',
		messageToPayee : '',
		deliveryChannel : '',
		feeAmount : undefined,
		feeCcy : '',
		documents : '',
	};
	$scope.payment = payment;
	




	/****************WATCHERS**********/
	$scope.$watch('bankAccount', function () {
		if($scope.bankAccount!=undefined)
			$scope.payment.fromAccountId=$scope.bankAccount.id;
	});
	$scope.$watch('payee', function () {
		if($scope.payee!=undefined){
			$scope.payment.payeeAccountId=$scope.payee;
			 var index =  $scope.indexOfObject( $scope.payeeList,'id' , $scope.payee);
			$scope.payeeAccount = $scope.payeeList[index];
		}
	});
	$scope.$watch('deliveryMethod', function () {
		if($scope.deliveryMethod!=undefined){
			$scope.payment.feeAmount=$scope.deliveryMethod.fees;
			$scope.payment.feeCcy=$scope.deliveryMethod.ccy;
			$scope.payment.deliveryChannel=$scope.deliveryMethod.method;
		}
	});
	/**********************************/
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
		if(!$scope.paymentForm.$error.required){
			console.log(JSON.stringify($scope.payment));
			$scope.paymentProcessed = true;
		}else{
			$scope.formError = true;
		}
	}
	$scope.postPayment = function(){
		//API Call and redirect it to ->
		$state.go('home.makePayment.paymentActivity');
	}
	$scope.cancelPayment = function(){
		$state.go($state.current, {}, {reload: true});
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