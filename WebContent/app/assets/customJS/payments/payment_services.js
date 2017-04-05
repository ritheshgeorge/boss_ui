var boss_payment_module = angular.module('bossApp');
boss_payment_module.factory('PaymentActivityService', ['$http','$cookies', function($http,$cookies) {
    return {
		paymentActivity_list: function() {
			req = {
		        method: 'GET',
		        url: $cookies.path + 'payment/getAllPayment',
		        params: {
		            leId: "abc123abc"
		        }
		    }
		    return $http(req).success(function(response) {
		        return response.data;
		    });
			
			
        }
    };
}]);
boss_payment_module.factory('PaymentService', ['$http','$cookies','$rootScope', function($http,$cookies,$rootScope) {
    return {
        getPayment: function(_paymentId) {
           req = {
		        method: 'POST',
		        url: $cookies.path + 'payment/getPayment',
		        params: {
		            leId: "abc123abc",
					paymentId: _paymentId
		        }
		    }
		    return $http(req).success(function(response) {
				 return response.payment;
			});
		   
		},
		
		make_payment: function(_payment, _recurringPayment) {
			console.log("I am inside make payment methos Service");
			console.log(_recurringPayment);
			req = {
		        method: 'POST',
		        url: $cookies.path + 'payment/savePayment',
		        params: {
		            paymentJSON: _payment,
					recurringPaymentJSON : _recurringPayment
		        }
		    }
		    return $http(req).success(function(response) {
				return response.data;
			});
		},
			/*
			  @Params 
					ccy1 bankAccount.currency
					ccy2 payeeAccount.accountCcy
					dealCcy  dealCcy
					dealAmount  payment.paymentAmount
					entityId  //add in Cookies
					payment Date deliveryMethod
			 */
			 
		requestRate: function(_ccy1, _ccy2, _dealCcy, _dealAmount, _entityId, _paymentDate){
			req = {
		        method: 'POST',
		        url: $cookies.path + 'payment/requestRate',
		        params: {
		            ccy1 : _ccy1,
					ccy2 : _ccy2,
					dealCcy : _dealCcy,
					dealAmount : _dealAmount,
					entityId : _entityId,
					paymentDate : _paymentDate
		        }
		    }
			 return $http(req).success(function(response) {
				return response.data;
			});
		},
		getDeliveryMethod : function(_ccy) {
            req = {
		        method: 'POST',
		        url: $cookies.path + 'payment/getPaymentDeliveryMethod',
		        params: { 
		            ccy: _ccy
		        }
		    }
			return $http(req).success(function(response) {
				return response.deliveryMethodList;
			});
		},
		getFees : function(_ccy,_method) {
            req = {
		        method: 'GET',
		        url: $cookies.path + 'payment/getPaymentFees',
		        params: {
		            ccy: _ccy,
					method : _method
		        }
		    }
			return $http(req).success(function(response) {
				return response;
			});
		},
		getRecurringPayment : function(_id) {
            req = {
		        method: 'GET',
		        url: $cookies.path + 'payment/getRecurringPayment',
		        params: {
		            paymentId: _id
				}
		    }
			return $http(req).success(function(response) {
				return response;
			});
		},
		downloadDocument : function(row) {
            req = {
		        method: 'GET',
		        url: $cookies.path + 'payment/downloadDocumnet',
		        params: {
		            documentJSON: row
				}
		    }
			$http(req).success(function(response) {
					console.log(response);
			});
		}
    };
}]);


boss_payment_module.factory('AccountService', ['$http','$cookies', function($http,$cookies) {
    return {
		getFromAccount: function() {
            /* check this Service If not needed delete this 
			Not used in payment Controller
			*/
			return $http.get($cookies.path+'/getFromAccount_list').then(function(response) {
				return response.data;
        }); 
        }
		
		
    };
}]);

boss_payment_module.factory('PaymentDocumentService', ['$http','$cookies', function($http,$cookies) {
    return {
		uploadDocument: function(_file,_paymentId,_isPayeeDocument) {
			var _user = JSON.parse($cookies.user);
			var formData = new FormData();
			formData.append('paymentId', _paymentId);
            formData.append('leId', _user.entityId);
            formData.append("file", _file);
            formData.append("isPayeeDocument", _isPayeeDocument);
			
            return $http.post($cookies.path + 'payment/uploadDocumets', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            });
		}
	};
}]);

