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
boss_payment_module.factory('PaymentService', ['$http', function($http) {
    return {
        getPayment: function(paymentId) {
           var payment = '{"paymentDate":"2017-02-24T20:08:56.182Z","fromAccountId":"9138","payeeAccountId":"2304","paymentAmount":5000,"paymentNotes":"","messageToPayee":"","deliveryChannel":"Wire","feeAmount":"25","feeCcy":"USD","documents":"","email":"saurabh@swapstech.com","mobile":"70481991014","messageToRecipient":"Please notify when payment is confirmed"}';
		   return JSON.parse(payment);
            /**
        return $http.get('../getPayment').then(function(response) {
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
            var fromAccountJSON = '[{"id":"2522","accountName":"Business Checking Account - 6869","amount":500.58,"ccy":"USD","status":"Active"},{"id":"6231","accountName":"Business Checking Account - 5287","amount":501.58,"ccy":"USD","status":"Active"},{"id":"9187","accountName":"Business Checking Account - 2970","amount":502.58,"ccy":"USD","status":"Active"},{"id":"5140","accountName":"Business Checking Account - 2748","amount":503.58,"ccy":"USD","status":"Active"},{"id":"6144","accountName":"Business Checking Account - 8101","amount":504.58,"ccy":"USD","status":"Active"},{"id":"9138","accountName":"Business Checking Account - 3370","amount":505.58,"ccy":"USD","status":"Active"},{"id":"4140","accountName":"Business Checking Account - 5276","amount":506.58,"ccy":"USD","status":"Active"},{"id":"1617","accountName":"Business Checking Account - 6563","amount":507.58,"ccy":"USD","status":"Active"}]';
            return JSON.parse(fromAccountJSON);
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