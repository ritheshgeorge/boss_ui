var app = angular.module('bossApp');
app.controller('paymentCtrl', ['$scope', '$http', '$state','ManagePayeeService','AccountSummaryService','AccountService','PaymentService', 
function($scope,$http,$state,ManagePayeeService,AccountSummaryService,AccountService,PaymentService) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
	$scope.paymentProcessed = false;
	$scope.numberOfDecimals = 2;
	$scope.today = new Date();
	$scope.pinVerified = false;
	
	ManagePayeeService.payee_list().then(function(data) {
        $scope.payeeList = data;
		});
	
	AccountSummaryService.bankAccount_list().then(function(data) {
      $scope.accountList = data;
	});
	
	$scope.deliveryMethodList = AccountService.getDeliveryMethod();
	
	$scope.paymentFrequency= "oneTime";
	var payment = {
		//paymentDate : '',
		fromAccountId : '',
		payeeAccountId : '',
		paymentAmount : '',
		paymentNotes : '',
		messageToPayee : '',
		deliveryChannel : '',
		feeAmount : '',
		feeCcy : '',
		emailAddress :'',
		phoneNumber : '',
		purposeOfPayment : '',
		documents : {},
	};
	$scope.payment = payment;
	
	$scope.updatedeliveryMethod = function(value){
		if(value!=undefined){
			var _index =  $scope.indexOfObject( $scope.deliveryMethodList,'method' , value);
			var _method = $scope.deliveryMethodList[_index];
			$scope.payment.feeAmount= _method.fees;
			$scope.payment.feeCcy= _method.ccy;
			$scope.payment.deliveryChannel= _method.method;
		}
		
	};
	/****************WATCHERS**********/
	$scope.$watch('bankAccount', function () {
		if($scope.bankAccount!=undefined)
			$scope.payment.fromAccountId=$scope.bankAccount.id;
	});
	$scope.$watch('payee', function () {
		if($scope.payee!=undefined){
			$scope.payment.payeeAccountId=$scope.payee;
			 var _index =  $scope.indexOfObject( $scope.payeeList,'id' , $scope.payee);
			$scope.payeeAccount = $scope.payeeList[_index];
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
			console.log($scope.payment);
			$scope.paymentProcessed = true;
		}else{
			$scope.formError = true;
		}
	}
	$scope.postPayment = function(){
		var _payment = $scope.payment;
		PaymentService.make_payment(_payment).then(function(data){
			$state.go('home.makePayment.paymentActivity');
		});
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