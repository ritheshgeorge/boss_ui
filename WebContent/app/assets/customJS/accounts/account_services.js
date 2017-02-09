var boss_account_module = angular.module('bossApp');
boss_account_module.factory('AccountSummaryService', ['$http', function($http) {
    return {
        bankAccount_list: function() {
            var acccountJSON = [];
            for (i = 0; i < 5; i++) {
                var account = {
                accountNicName: 'Business Account Name',
                accountName: 'Business Checking Account',
                accountNumber: (Math.floor(1000 + Math.random() * 9000)),
                accountCode: 'Checking',
                accountType: 'AccountType',
                accountBalance: '50,000.00'
            };
				acccountJSON.push(account);
            }
            return acccountJSON;
            /**
        return $http.get('../getAccount_list').then(function(response) {
          return response.data;
        }); */
        }
    };
}]);
boss_account_module.factory('AccountActivityService', ['$http', function($http) {
    return {
        accountActivity_list: function() {
            var account = {
                accountNicName: 'Business Account Name',
                accountName: 'Business Checking Account',
                accountNumber: '1234',
                accountCode: 'Checking',
                accountType: 'AccountType',
                accountBalance: 50000.50
            };
            var accountActivityJSON = [];
            for (i = 0; i < 500; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                var amount = 50000.00;
                var accountActivity = {
                    date: date,
                    description: "1000.00 json Credit from ***6589",
                    amount: (i + 500.58),
                    status: "Authorized",
                    availableBalance: (amount + (i + 500.58))
                }
                accountActivityJSON.push(accountActivity);
            }
            var acccountJSON = {
                account: account,
                accountActivity: accountActivityJSON
            }
            return acccountJSON;
            /**
        return $http.get('../getAccountActivity_list').then(function(response) {
          return response.data;
        }); */
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