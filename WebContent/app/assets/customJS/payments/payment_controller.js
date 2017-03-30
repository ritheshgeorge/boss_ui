var app = angular.module('bossApp');
app.controller('paymentCtrl', ['$scope', '$rootScope', '$http', '$state', '$interval','$cookies', 'ManagePayeeService', 'AccountSummaryService', 'PaymentService','$anchorScroll', '$location',
    function($scope, $rootScope, $http, $state, $interval,$cookies , ManagePayeeService, AccountSummaryService, PaymentService,$anchorScroll, $location) {
		$scope.loading = true;
        $http.defaults.headers.post["Content-Type"] = "application/json";
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
            documents: {},
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
			console.log($scope.documents);
            if (!$scope.paymentForm.$error.required) {
                console.log(JSON.stringify($scope.payment));
                console.log($scope.payment);
                $scope.paymentProcessed = true;
				//scroll up
				 $location.hash('confirmPage');
			} else {
                $scope.formError = true;
            }
        }
		
		 
		
		
        $scope.postPayment = function() {
            var _payment = $scope.payment;
			var _recurringPayment = $scope.recurringPayment;
			PaymentService.make_payment(_payment, _recurringPayment).then(function(data) {
                $state.go('home.makePayment.paymentActivity');
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
		/******************************************/
		/** File uploader
		
		 $scope.files = []; 
		  $scope.upload=function(){
			alert($scope.files.length+" files selected ... Write your Upload Code"); 
			
		  };
		
		//HTML
		<input type="file" ng-file-model="files" multiple />
		<button type="button" ng-click="upload()">Upload</button>
		
		<p ng-repeat="file in files">
		  {{file._file}}
		  <img src="{{file.name}}">
		</p>
		
		**/
		
		
	 $scope.stepsModel = [];

    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    }
		
		
		
	/***************************************************************************************
	              DRAG and DROP
	***************************************************************************************/
	//============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Drop files here...'

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        $scope.$apply(function(){
            $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
            $scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function(){
                $scope.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function(element) {
    $scope.$apply(function(scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        $scope.files = []
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      scope.progressVisible = false
      });
    };
	
	$scope.removeFiles = function(_index){
		 $scope.files.splice(_index, 1);
    };
	
    $scope.uploadFile = function() {
        var fd = new FormData()
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", "/fileupload")
        $scope.progressVisible = true
        xhr.send(fd)
    }

    function uploadProgress(evt) {
        $scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText)
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        $scope.$apply(function(){
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}]);