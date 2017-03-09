var boss_payee_module = angular.module('bossApp');

boss_payee_module.factory('ManagePayeeService', ['$http','$cookies', function($http,$cookies) {
    return {
		payee_list: function() {
			var actionUrl = $cookies.path+'payee/getAllPayee';
			actionUrl = actionUrl+'?leId=abc123abc';
			return $http.get(actionUrl).then(function(response) {
			  return response.data;
			}); 
		}
    };
}]);

boss_payee_module.factory('PayeeNewEditService', ['$http','$cookies',function($http,$cookies) {
    return {
      newedit: function(leId,payeeId) {
		 var actionUrl = $cookies.path+'payee/getPayee';
        actionUrl = actionUrl+'?leId=abc123abc&payeeId='+payeeId;
        console.log('actionUrl is >>>'+actionUrl);
        return $http.get(actionUrl).then(function(response) {
			return response.data;
        });
	},
	  savePayee: function(_payee) {
		  _payee.accountWithBank = undefined;
		  _payee.reAccountNumber = undefined;
			req = {
					method: 'POST',
					url: $cookies.path+'payee/savePayee', 
					params: {payee: _payee }
					}
				 $http(req).success(function(data, status, headers) {
							console.log(headers);
							console.log(status);
						}).error(function(data, status, headers, config) {
								console.log(data);
						}); 
		}
    };
  }]);
  
 
  
  
  
  
  
  
  
  
  
  
  
  