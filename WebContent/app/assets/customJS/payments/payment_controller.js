var app = angular.module('bossApp');
app.controller('paymentCtrl', ['$scope', '$rootScope', '$http', '$state', '$interval','$cookies', 'ManagePayeeService', 'AccountSummaryService', 'PaymentService','$anchorScroll', '$location','PaymentDocumentService','TwoFAService',
    function($scope, $rootScope, $http, $state, $interval,$cookies , ManagePayeeService, AccountSummaryService, PaymentService,$anchorScroll, $location,PaymentDocumentService,TwoFAService) {
		$scope.loading = true;
		$scope.files = [];
		$scope.payeeFiles = [];
    	var _user = JSON.parse($cookies.user);
        $scope.paymentProcessed = false;
        $scope.numberOfDecimals = 2;
        $scope.today = new Date();
        $scope.pinVerified = false;
		$scope.minPaymentDate = new Date();

        ManagePayeeService.payee_list().then(function(data) {
            $scope.payeeList = data;
			AccountSummaryService.bankAccount_list().then(function(response) {
            $scope.accountList = response;
			$scope.loading=false;
        });
        });

        $scope.paymentFrequency = "recurring";
        var payment = {
            paymentDate : '',
            fromAccountId: '',
            payeeAccountId: '',
            paymentAmount: undefined,
            paymentNotes: '',
            messageToPayee: '',
            deliveryChannel: '',
            feeAmount: '',
            feeCcy: '',
            emailAddress: '',
            phoneNumber: '',
            purposeOfPayment: '',
			isApproved: false,
		};
        $scope.payment = payment;
	
		$scope.updatedeliveryMethod = function(value) {
            if (value != undefined) {
				// Call fees here
                var _index = $scope.indexOfObject($scope.deliveryMethodList, 'method', value);
                var _method = $scope.deliveryMethodList[_index];
                $scope.payment.deliveryChannel = _method.method;
				$scope.payment.paymentDate = _method.dateString;
				$scope.minPaymentDate = new Date(_method.dateString);
				PaymentService.getFees(_method.ccy,_method.method).then(function(response){
					$scope.payment.feeAmount = response.data.feeAmount;
					$scope.payment.feeCcy = response.data.feeCcy;	
				});
			}
		};
        /****************WATCHERS**********/
        $scope.$watch('bankAccount', function() {
            if ($scope.bankAccount != undefined){
				$scope.payment.fromAccountId = $scope.bankAccount.id;
				$scope.dealCcy = $scope.bankAccount.currency;
				$scope.rejectRate("watch");$scope.displayExRateInfo=false;
			}
        });
        $scope.$watch('payee', function() {
            if ($scope.payee != undefined) {
                $scope.payment.payeeAccountId = $scope.payee;
                var _index = $scope.indexOfObject($scope.payeeList, 'id', $scope.payee);
                $scope.payeeAccount = $scope.payeeList[_index];
				$scope.getDeliveryMethod($scope.payeeAccount.accountCcy);
				$scope.rejectRate("watch");$scope.displayExRateInfo=false;
			}
        });  displayExRateInfo = true; displayRateTimer = false; rateaccepted = true;
		$scope.$watch('amountOption', function() {
			if(!$rootScope.isUndefined($scope.bankAccount) && !$rootScope.isUndefined($scope.payeeAccount))
            $scope.dealCcy = (!$rootScope.isUndefined($scope.amountOption) && $scope.amountOption=="notEquivalent")?$scope.payeeAccount.accountCcy:$scope.bankAccount.currency;
		});
		$scope.$watch('payment.paymentDate', function() {
			if(!$rootScope.isUndefined($scope.payment.paymentDate) && !$rootScope.isUndefined($scope.deliveryMethod)){
				 var _index = $scope.indexOfObject($scope.deliveryMethodList, 'method', $scope.deliveryMethod);
				 var _dm_paymentDate = new Date($scope.deliveryMethodList[_index].dateString);
				 var _paymentDate = new Date($scope.payment.paymentDate);
				 if(_dm_paymentDate<_paymentDate){
					 $scope.rejectRate();
					 $scope.displayExRateInfo = true;
					 $scope.displayRateTimer = false;
					 $scope.rateaccepted = true;
					 $scope.expMsg = "Your Payment will be pprocessed two days before the scheduled date.";
					 $scope.ratetxt = "";
					 $scope.exchangeRateInformation = undefined;
				 }else if(_dm_paymentDate.toLocaleDateString()==_paymentDate.toLocaleDateString()){
					 $scope.rejectRate("watch");$scope.displayExRateInfo=false;
				 }
			}
					
		});
		$scope.$watchCollection('[recurringPayment.frequency,recurringPayment.firstPaymentDate,recurringPayment.limit]', function()
		  {
			  $scope.recurringPayReq=(
				  !$rootScope.isUndefined($scope.recurringPayment.frequency) ||
				  !$rootScope.isUndefined($scope.recurringPayment.firstPaymentDate) ||
				  !$rootScope.isUndefined($scope.recurringPayment.limit) 
				)?true:false;
			  
			
		});
        /**********************************/
        $scope.indexOfObject = function indexOfObject(array, property, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][property] === value) return i;
            }
            return -1;
        };
        /* Date Picker */
        $scope.openPaymentDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openPaymentCal = true;
        }



        $scope.makePayment = function() {
			if (!$scope.paymentForm.$error.required) {
                TwoFAService.is2FARequired($scope.payment.paymentAmount, $scope.payeeAccount.accountCcy, $scope.payment.paymentDate).then(function(response){
					console.log(response.data);
					$scope.twoFARequired = response.data.isApproved;
					$scope.payment.isApproved = response.data.isApproved;
					$scope.paymentProcessed = true;
					$location.hash('confirmPage');
				});
			} else {
                $scope.formError = true;
            }
        }
		/**
		*   Upload Documents for your reference.
		*/
		function processNextDocument(paymentId, currentIndex) {
			var isPayeeDocument = false;
		    if (currentIndex >= $scope.files.length) {
		       // $state.go('home.makePayment.paymentActivity');
			   processNextPayeeDocument(paymentId,0);
		        return;
		    }
		    var _files = $scope.files;
		    var fileObject = _files[currentIndex]
		    if (!$rootScope.isUndefined(fileObject)) {
		        PaymentDocumentService.uploadDocument(fileObject, paymentId,isPayeeDocument).then(function() {
		            var next = angular.copy(currentIndex + 1);
		            console.log("next", next);
		            processNextDocument(paymentId, next);
		        });
		    }
		}
		/**
		*   Upload Documents to send it to Payee.
		*/
		function processNextPayeeDocument(paymentId, currentIndex) {
			var isPayeeDocument = true;
		    if (currentIndex >= $scope.payeeFiles.length) {
		        $state.go('home.makePayment.paymentActivity');
		        return;
		    }
		    var _files = $scope.payeeFiles;
		    var fileObject = _files[currentIndex]
		    if (!$rootScope.isUndefined(fileObject)) {
		        PaymentDocumentService.uploadDocument(fileObject, paymentId,isPayeeDocument).then(function() {
		            var next = angular.copy(currentIndex + 1);
		            console.log("next", next);
		            processNextPayeeDocument(paymentId, next);
		        });
		    }
		}

		$scope.postPayment = function() {
		    var _payment = $scope.payment;
			var payDate = angular.copy(new Date(_payment.paymentDate));
			_payment.paymentDate = payDate.toLocaleDateString();
		    var _recurringPayment = $scope.recurringPayment;
		    PaymentService.make_payment(_payment, _recurringPayment).then(function(response) {
		        processNextDocument(response.data.paymentId, 0);
		    });
		}
		$scope.cancelPayment = function() {
		        $state.go("home.makePayment");
		}


        /**
        	Two-Factor
        **/
        $scope.sendVerificationCode = function(method) {
            console.log(method);
            //service call
            $scope.enterVerficationCode = true;
            $scope.pendingVerification = true;
        }
        $scope.verifyPin = function(pin) {
            console.log(pin);
            //service call
            $scope.pinVerified = true;
        }
		/*
		*   Get Rate on amount blur
		*/
        $scope.getRate = function() {
			$scope.getRateError = "";
			$scope.expMsg="";
		 if (!$scope.loopStart) { 
			  if( $rootScope.isUndefined($scope.bankAccount)
					|| $rootScope.isUndefined($scope.payeeAccount)
					|| $rootScope.isUndefined($scope.dealCcy)
					|| $rootScope.isUndefined($scope.payment.paymentAmount)
					|| $rootScope.isUndefined(_user.entityId)
					|| $rootScope.isUndefined($scope.deliveryMethod)
			  ){
				  $scope.getRateError = "Please select all options to get Exchange Rate."
			  }else{
			 var _index = $scope.indexOfObject($scope.deliveryMethodList, 'method', $scope.deliveryMethod);
             var _deliveryMethod = $scope.deliveryMethodList[_index];
			 var _date = new Date(_deliveryMethod.time.values[0]+"-"+(_deliveryMethod.time.values[1])+"-"+_deliveryMethod.time.values[2]);
			PaymentService.requestRate(
				$scope.bankAccount.currency,
				$scope.payeeAccount.accountCcy,
				$scope.dealCcy,
				$scope.payment.paymentAmount,
				_user.entityId,
				_date.toLocaleDateString()
			).then(function(response) {
				$scope.exchangeRateInformation = response.data;
				$scope.expiry = response.data.expiry;
				/*******************
					NG-KNOB Options
				*******************/
				//var _txt = "1 "+response.data.baseCcy + "="+response.data.exchangeRate+" "+response.data.QuoteCcy; //modified this
				$scope.ratetxt = "1 "+response.data.baseCcy + "="+response.data.exchangeRate+" "+response.data.QuoteCcy; //modified this
                var options = {
                    subText: {
                        enabled: true,
                        text: '',
                        color: 'black',
                        font: '11'
                    },
                    min: 0,
                    max: $scope.expiry+4,
                    scale: {
                        enabled: true,
                        type: 'lines',
                        color: 'gray',
                        width: 0,
                        quantity: 0,
                        height: 2
                    },
                    animate: {
                        enabled: true,
                        duration: 2000,
                        ease: 'linear'
                    },
                    size: 140,
                    fontSize: 30,
                    trackWidth: 5,
                    readOnly: true,
                    barWidth: 5,
                    step: 1,
                    trackColor: 'rgba(52,152,219,.1)',
                    barColor: '#00a792',
                    barCap: 5,
                    dynamicOptions: true,
					
                };
                $scope.expiryValue = $scope.expiry;
                $scope.knobOptions = angular.copy(options);
              
                    $scope.displayRateTimer = true;
                    $scope.startKnob();
					$scope.displayExRateInfo=true;
            });
			  }
		}
        }
        //KNOB PRE-DEFINED OPTIONS
        $scope.expiryValue = 0;
        $scope.knobValue = 4;
        $scope.knobOptions = {};

        $scope.startKnob = function() {
			//$scope.knowTimeOut = false;
			$scope.timerVal = 0;
			var _val = 4;
            var started = Date.now();
			if(!$scope.loopStart){
            $scope.interval = $interval(function() {
				$scope.loopStart = true;
                var _int = $scope.expiryValue * 1000;
                if (Date.now() - started >= _int) {
                   $scope.stopKnob();
				   $scope.displayExRateInfo = false;
				} else {
                    $scope.knobValue = _val;
					$scope.timerVal = angular.copy($scope.expiryValue - ($scope.knobValue-4));
                    _val = _val + 0.01;
                }
            }, 10);
		}
        };
		$scope.rejectRate = function(_val){
			$scope.stopKnob();
			$scope.rateaccepted = false;
			$scope.exchangeRateInformation=undefined;
			$scope.ratetxt="";
			$scope.expMsg=(_val)?"":"Exchange Rate Rejected. You can Request Another Rate.";
		}
		$scope.acceptRate = function(){
			$scope.expMsg="Accepted Rate:";
			$scope.displayExRateInfo = true;
			$scope.rateaccepted = true;
			$scope.stopKnob();
		}
        $scope.stopKnob = function() {
			$scope.loopStart = false;
			$scope.knobValue = 4;
            $interval.cancel($scope.interval);
            $scope.displayRateTimer = false;
        }
        /*
		*    Get delivery method for particular currency - accoutn change watcher
		*/
		$scope.getDeliveryMethod = function(_ccy){
			PaymentService.getDeliveryMethod(_ccy).success(function(response){
				var deliveryMethodList = [];
				deliveryMethodList = response.deliveryMethodList;
				for(var i in deliveryMethodList){
					if(!$rootScope.isUndefined(deliveryMethodList[i])){
							var date = new Date(deliveryMethodList[i].time.values[0]+"-"+(deliveryMethodList[i].time.values[1])+"-"+deliveryMethodList[i].time.values[2]);
							deliveryMethodList[i].description = deliveryMethodList[i].method +" (deliver by " + date.toLocaleDateString() +")";
							deliveryMethodList[i].dateString = date.toLocaleDateString();
						}
					}
				
				$scope.deliveryMethodList = deliveryMethodList;
			});
		}
		/**************************************************
		  Methods used in regards to Recurring Payment 
		**************************************************/
		var recurringPayment = {
			frequency : undefined,
			firstPaymentDate : undefined,
			limit : undefined,
			amountPaid : undefined,
			lastPaymentDate : undefined,
			cronPattern : undefined,
		};
		$scope.recurringPayment = recurringPayment;
		/* date picker */
		$scope.openFirstPaymentDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openFirstPaymentCal = true;
        }
		$scope.openLastPaymentDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openLastPaymentCal = true;
        }
		/****** watcher for recurring Payment *******/
		$scope.$watch('firstPaymentDate', function() {
			if(!$rootScope.isUndefined($scope.firstPaymentDate)){
				var _date = $scope.firstPaymentDate;
				$scope.recurringPayment.firstPaymentDate = _date.toLocaleDateString();
			}
		});
		$scope.$watch('lastPaymentDate', function() {
			if(!$rootScope.isUndefined($scope.lastPaymentDate)){
				var _date = $scope.lastPaymentDate;
				$scope.recurringPayment.lastPaymentDate = _date.toLocaleDateString();
			}
		});
	/***************************************************************************************
	              DRAG and DROP Reference Documents
	***************************************************************************************/
	var dropbox = document.getElementById("dropbox")
    
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
		console.log("-----Dropbox",evt.dataTransfer.types);
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
    }, false) 
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        /*$scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })*/
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            $scope.$apply(function(){
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    $scope.setFiles = function(element) {
    $scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        //$scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      scope.progressVisible = false
      });
    };
	
	$scope.removeFiles = function(_index){
		 $scope.files.splice(_index, 1);
    };
	/***************************************************************************************
	              DRAG and DROP Payee Documents
	***************************************************************************************/
	var payeeDropbox = document.getElementById("payeeDropbox")
    
    payeeDropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
		console.log("-----payeeDropbox",evt.dataTransfer.types);
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
    }, false) 
    payeeDropbox.addEventListener("drop", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var payeeFiles = evt.dataTransfer.files;
		if (payeeFiles.length > 0) {
            $scope.$apply(function(){
                for (var i = 0; i < payeeFiles.length; i++) {
					console.log("payeeFiles",payeeFiles[i]);
                    $scope.payeeFiles.push(payeeFiles[i])
                }
            })
        }
		console.log("$scope.payeeFiles",$scope.payeeFiles);
    }, false)
    $scope.setPayeeFiles = function(element) {
    $scope.$apply(function(scope) {
      console.log('payeeFiles:', element.files);
      // Turn the FileList object into an Array
       // $scope.payeeFiles = []
        for (var i = 0; i < element.files.length; i++) {
		  console.log("element.files[i]",element.files[i]);
          $scope.payeeFiles.push(element.files[i]);
        }
      scope.progressVisible = false
      });
    };
	
	$scope.removePayeeFiles = function(_index){
		 $scope.payeeFiles.splice(_index, 1);
    };	
		
	}]);