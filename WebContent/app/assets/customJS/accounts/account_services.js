var boss_account_module = angular.module('bossApp');
boss_account_module.factory('AccountSummaryService', ['$http','$rootScope', function($http,$rootScope) {
    return {
        bankAccount_list: function() {   
          var actionUrl = $rootScope.path+'bankAccount/getAccount_list/abc183kdig';
			return $http.post(actionUrl).then(function(response) {
				return response.data;
			});
		}
    };
}]);
boss_account_module.factory('TransactionService', ['$http','$cookies', function($http,$cookies) {
    return {
        getTransactionList: function(_account_id){
			req = {
				method: 'POST',
				url: $cookies.path+'bankAccount/getAccountActivity', 
				params: {accountId: _account_id }
			}
			return $http(req).success(function(response) {
				return response.data;
			}); 
		
		}
		
		
		
		
		
		
		
		
		
		
		
		
    };
}]);























boss_account_module.factory('AccountStatementService', ['$http', function($http) {
    return {
        accountStatement_list: function() {
            var accountSatementJSON = [];
            for (i = 0; i < 500; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                var amount = 50000.00;
                var accountStatement = {
                    date: date,
                    fileName: "Bank Statement",
                    fileType: (i%2)?"PDF":(i%3)?"TXT":"DOC",
                    size:((i + 524)+"kb"),
                }
                accountSatementJSON.push(accountStatement);
            }
            return accountSatementJSON;
            /**
        return $http.get('../getAccountActivity_list').then(function(response) {
          return response.data;
        }); */
        }
    };			
}]);

boss_account_module.factory('AccountService', ['$http', function($http) {
				var _list = [];
  
			  return {
				getList: function() {
				  return _list;
				},
				
				add: function(item) {
				  _list.push(item);
				  return item + ' is added';
				},
				
				remove: function(index) {
				  var item = _list.splice(index, 1)[0];
				  return item + ' has been deleted';
				},
				
				emptyList: function() {
				  _list = [];
				  return 'list is empty';
				}
  };
}]);