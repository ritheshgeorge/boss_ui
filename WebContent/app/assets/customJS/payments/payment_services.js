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


boss_payment_module.factory('AccountService', ['$http','$cookies', function($http,$cookies) {
    return {
		getFromAccount: function() {
            /* check this Service If not needed delete this */
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

