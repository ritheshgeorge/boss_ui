var boss_payment_module = angular.module('bossApp');

boss_payment_module.factory('PaymentActivityService', ['$http', function($http) {
    return {
        paymentActivity_list: function() {
            var account = {
                accountNicName: 'Business Account Name',
                accountName: 'Business Checking Account',
                accountNumber: '1234',
                accountCode: 'Checking',
                accountType: 'AccountType',
                accountBalance: 50000.50
            };
            var paymentActivityJSON = [];
            for (i = 0; i < 500; i++) {
                var date = new Date();
                date.setDate(date.getDate() + i);
                var amount = 50000.00;
                var paymentActivity = {
					id: "sd5cdg5aazxf8",
					transactionNumber : ((Math.floor(1000 + Math.random() * 9000))).toString(),
                    sendDate: date,
                    fromAccount: ("Business Checking Account - " + ((Math.floor(1000 + Math.random() * 9000)))).toString(),
					toAccount: "ABC Corporation",
                    amount: (i + 500.58),
					ccy: 'USD',
                    status: "New",
					isRecurring: (i % 2)?true:false
                }
                paymentActivityJSON.push(paymentActivity);
            }
            var acccountJSON = {
                paymentActivity: paymentActivityJSON
            }
            return acccountJSON;
            /**
        return $http.get('../getAccountActivity_list').then(function(response) {
          return response.data;
        }); */
        }
    };
}]);


/*******************************************************************************************************
*********************** MOVE TO ACCOUNT SERVICE ********************************************************
*******************************************************************************************************/
var boss_account_module = angular.module('bossApp');
boss_account_module.factory('AccountService', ['$http', function($http) {
    return {
		getFromAccount: function() {
            var fromAccountJSON = [];
            for (i = 0; i < 8; i++) {
                var fromAccount = {
					id : ((Math.floor(1000 + Math.random() * 9000))).toString(),
                    accountName: ("Business Checking Account - " + ((Math.floor(1000 + Math.random() * 9000)))).toString(),
					amount: (i + 500.58),
					ccy: 'USD',
                    status: "Active",
				}
                fromAccountJSON.push(fromAccount);
            }
            return fromAccountJSON;
            /**
        return $http.get('../getFromAccount_list').then(function(response) {
          return response.data;
        }); */
        },
		
		getDeliveryMethod : function() {
            var deliveryMethodJSON = [];
            for (i = 0; i < 3; i++) {
				var date = new Date();
                date.setDate(date.getDate() + i);
                var method = {
					method : (i==0)?"Wire":(i==1)?"ACH":"Check",
					time : date,
					fees : (i==0)?"$25":(i==1)?"$10":"$0",
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