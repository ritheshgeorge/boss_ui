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
boss_payment_module.factory('PaymentService', ['$http','$cookies', function($http,$cookies) {
    return {
        getPayment: function(paymentId) {
           var payment = '{"paymentDate":"2017-02-24T20:08:56.182Z","fromAccountId":"9138","payeeAccountId":"2304","paymentAmount":5000,"paymentNotes":"","messageToPayee":"","deliveryChannel":"Wire","feeAmount":"25","feeCcy":"USD","documents":"","email":"saurabh@swapstech.com","mobile":"70481991014","messageToRecipient":"Please notify when payment is confirmed"}';
		   
		   return JSON.parse(payment);
           /**
        return $http.get('../getAllPayment').then(function(response) {
          return response.data;
        }); */
		},
		
		make_payment: function(_payment) {
			req = {
		        method: 'POST',
		        url: $cookies.path + 'payment/savePayment',
		        params: {
		            paymentJSON: _payment
		        }
		    }
		    return $http(req).success(function(response) {
				return response.data;
			});
		}
    };
}]);


/*******************************************************************************************************
*********************** MOVE TO ACCOUNT SERVICE ********************************************************
*******************************************************************************************************/
var boss_account_module = angular.module('bossApp');
boss_account_module.factory('AccountService', ['$http','$cookies', function($http,$cookies) {
    return {
		getFromAccount: function() {
            
			return $http.get($cookies.path+'/getFromAccount_list').then(function(response) {
				return response.data;
        }); 
        },
		
		getDeliveryMethod : function() {
            var deliveryMethodJSON = [];
            for (i = 0; i < 3; i++) {
				var date = new Date();
                date.setDate(date.getDate() + i);
                var method = {
					method : (i==0)?"Wire":(i==1)?"ACH":"Check",
					time : date,
					fees : (i==0)?"25":(i==1)?"10":"0",
					ccy : "USD",
					description : ((i==0)?"Wire":(i==1)?"ACH":"Check") +" (deliver by " + date.toLocaleDateString() +")",
				}
                deliveryMethodJSON.push(method);
            }
            return deliveryMethodJSON;
            /**
        return $http.get('../getFromAccount_list').then(function(response) {
          return response.data;
        }); */
        }
    };
}]);


/******************************************************************************************************/