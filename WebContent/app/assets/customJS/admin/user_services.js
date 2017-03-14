var boss_user_module = angular.module('bossApp');

boss_user_module.factory('UserNewEditService', ['$http','$cookies',function($http,$cookies) {
    return {
		
      newedit: function(leId,userId) {
		 var actionUrl = $cookies.path+'user/getUser';
        actionUrl = actionUrl+'?leId='+leId+'&id='+userId;
        console.log('actionUrl is >>>'+actionUrl);
        return $http.get(actionUrl).then(function(response) {
			return response.data;
        });
	},
	  savePayee: function(user) {
			req = {
					method: 'POST',
					url: $cookies.path+'user/saveUser', 
					params: {userJSON: user }
					}
			return $http(req).success(function(response) {
							return response.data;
						}); 
		},
		getUserList: function(entityId){
			req = {
					method: 'GET',
					url: $cookies.path+'user/getUserList', 
					params: {leId: entityId }
					}
			return $http(req).success(function(response) {
							return response.data;
						}); 
		}
    };
  }]);
  
  boss_user_module.factory('EntitlementService', ['$http','$cookies',function($http,$cookies) {
    return {
		
      getListOfEntitlement: function(_ent) {
		var entitlement_list = [];
		if(_ent != undefined){
			/*** FX Trading ***/
			if(_ent.fxTrading.spot){
				manage_p_entitlement = {appId : "BOSS_TRADE_SPOT",Description : "Spot Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.outrightForward){
				manage_p_entitlement = {appId : "BOSS_TRADE_OUTRIGHTFORWARD",Description : "Outright Forward Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.windowForward){
				manage_p_entitlement = {appId : "BOSS_TRADE_WINDOWFORWARD",Description : "Window Foraward Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.windowDrawdown){
				manage_p_entitlement = {appId : "BOSS_TRADE_WINDOWDRAWDOWN",Description : "Window Drawdown Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.nonDelivarableForward){
				manage_p_entitlement = {appId : "BOSS_TRADE_NONDELIVARABLEFORWARD",Description : "Non Delivarable Forward"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.instructTrade){
				manage_p_entitlement = {appId : "BOSS_TRADE_INSTRUCT",Description : "Instruct Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.authorizeTrade){
				manage_p_entitlement = {appId : "BOSS_TRADE_AUTHORIZE",Description : "Authorize Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.fxTrading.confirmTrade){
				manage_p_entitlement = {appId : "BOSS_TRADE_CONFIRM",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			/*** PAYMENTS ***/
			if(_ent.payments.viewPayments){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_VIEW",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.submitPayments){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_SUBMIT",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.authorizePayments){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_AUTHORIZE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.addPayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_ADDPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.modifyPayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_MODIFYPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.authorizePayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_AUTHORIZEPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.suspendPayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_SUSPENDPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.deletePayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_DELETEPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.payments.viewpayee){
				manage_p_entitlement = {appId : "BOSS_PAYMENT_VIEWPAYEE",Description : "Confirm Trade"};
				entitlement_list.push(manage_p_entitlement);
			}
			/*** USER ADMINISTRATION ***/
			if(_ent.admin.addUser){
				manage_p_entitlement = {appId : "BOSS_ADMIN_ADDUSER",Description : "Add User"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.admin.approveUser){
				manage_p_entitlement = {appId : "BOSS_ADMIN_APPROVEUSER",Description : "Approve User"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.admin.modifyUser){
				manage_p_entitlement = {appId : "BOSS_ADMIN_MODIFYUSER",Description : "Modify User"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.admin.suspendUser){
				manage_p_entitlement = {appId : "BOSS_ADMIN_SUSPENDUSER",Description : "Suspend User"};
				entitlement_list.push(manage_p_entitlement);
			}
			if(_ent.admin.deleteUser){
				manage_p_entitlement = {appId : "BOSS_ADMIN_DELETEUSER",Description : "Delete User"};
				entitlement_list.push(manage_p_entitlement);
			}
			
		}
		return entitlement_list;
		
		},
		generateListOfEntitlements: function(){ //NU
			entitlement_list=[];
			/** FX Trading **/
			entitlement_list.push({appId : "BOSS_TRADE_SPOT",Description : "Spot Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_OUTRIGHTFORWARD",Description : "Outright Forward Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_WINDOWFORWARD",Description : "Window Foraward Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_WINDOWDRAWDOWN",Description : "Window Drawdown Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_NONDELIVARABLEFORWARD",Description : "Non Delivarable Forward"});
			entitlement_list.push({appId : "BOSS_TRADE_INSTRUCT",Description : "Instruct Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_AUTHORIZE",Description : "Authorize Trade"});
			entitlement_list.push({appId : "BOSS_TRADE_CONFIRM",Description : "Confirm Trade"});
			/** Payments **/
			entitlement_list.push({appId : "BOSS_PAYMENT_VIEW",Description : "View Payments"});
			entitlement_list.push({appId : "BOSS_PAYMENT_SUBMIT",Description : "Submit Payement"});
			entitlement_list.push({appId : "BOSS_PAYMENT_AUTHORIZE",Description : "Authorize Payment"});
			entitlement_list.push({appId : "BOSS_PAYMENT_ADDPAYEE",Description : "Add New Payee"});
			entitlement_list.push({appId : "BOSS_PAYMENT_MODIFYPAYEE",Description : "Modify Payee"});
			entitlement_list.push({appId : "BOSS_PAYMENT_AUTHORIZEPAYEE",Description : "Authorize Payee"});
			entitlement_list.push({appId : "BOSS_PAYMENT_SUSPENDPAYEE",Description : "Suspend Payee"});
			entitlement_list.push({appId : "BOSS_PAYMENT_DELETEPAYEE",Description : "Delete Payee"});
			entitlement_list.push({appId : "BOSS_PAYMENT_VIEWPAYEE",Description : "View Payee"});
			/** User Admin **/
			entitlement_list.push({appId : "BOSS_ADMIN_ADDUSER",Description : "Add User"});
			entitlement_list.push({appId : "BOSS_ADMIN_APPROVEUSER",Description : "Approve User"});
			entitlement_list.push({appId : "BOSS_ADMIN_MODIFYUSER",Description : "Modify User"});
			entitlement_list.push({appId : "BOSS_ADMIN_SUSPENDUSER",Description : "Suspend User"});
			entitlement_list.push({appId : "BOSS_ADMIN_DELETEUSER",Description : "Delete User"});
			return entitlement_list;
			
		},
		createEntitlement: function(){
			var entitlement={
				fxTrading :{
					spot : '',
					outrightForward : '',
					windowForward : '',
					windowDrawdown : '',
					nonDelivarableForward : '',
					instructTrade : '',
					authorizeTrade : '',
					confirmTrade : '',
				},
				payments :{
					viewPayments : '',
					submitPayments : '',
					authorizePayments : '',
					addPayee : '',
					modifyPayee : '',
					authorizePayee : '',
					suspendPayee : '',
					deletePayee : '',
					viewpayee  : '',
				},
				admin :{
					addUser  : '',
					approveUser  : '',
					modifyUser  : '',
					suspendUser  : '',
					deleteUser  : '',
				},
			};
			return entitlement;
		},
		setEntitlement : function(list){
			var _entitlement ={fxTrading:{},payments:{},admin:{}};
			angular.forEach(list, function(value, index) {
				/* fx Trade */
				if(angular.equals(value.appId, "BOSS_TRADE_SPOT")){_entitlement.fxTrading.spot=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_OUTRIGHTFORWARD")){_entitlement.fxTrading.outrightForward=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_WINDOWFORWARD")){_entitlement.fxTrading.windowForward=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_WINDOWDRAWDOWN")){_entitlement.fxTrading.windowDrawdown=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_NONDELIVARABLEFORWARD")){_entitlement.fxTrading.nonDelivarableForward=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_INSTRUCT")){_entitlement.fxTrading.instructTrade=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_AUTHORIZE")){_entitlement.fxTrading.authorizeTrade=true;}
				if(angular.equals(value.appId, "BOSS_TRADE_CONFIRM")){_entitlement.fxTrading.confirmTrade=true;}
				/* Payment */
				if(angular.equals(value.appId, "BOSS_PAYMENT_VIEW")){_entitlement.payments.viewPayments=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_SUBMIT")){_entitlement.payments.submitPayments=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_AUTHORIZE")){_entitlement.payments.authorizePayments=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_ADDPAYEE")){_entitlement.payments.addPayee=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_MODIFYPAYEE")){_entitlement.payments.modifyPayee=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_AUTHORIZEPAYEE")){_entitlement.payments.authorizePayee=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_SUSPENDPAYEE")){_entitlement.payments.suspendPayee=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_DELETEPAYEE")){_entitlement.payments.deletePayee=true;}
				if(angular.equals(value.appId, "BOSS_PAYMENT_VIEWPAYEE")){_entitlement.payments.viewpayee=true;}
				/* user admin */
				if(angular.equals(value.appId, "BOSS_ADMIN_ADDUSER")){_entitlement.admin.addUser=true;}
				if(angular.equals(value.appId, "BOSS_ADMIN_APPROVEUSER")){_entitlement.admin.approveUser=true;}
				if(angular.equals(value.appId, "BOSS_ADMIN_MODIFYUSER")){_entitlement.admin.modifyUser=true;}
				if(angular.equals(value.appId, "BOSS_ADMIN_SUSPENDUSER")){_entitlement.admin.suspendUser=true;}
				if(angular.equals(value.appId, "BOSS_ADMIN_DELETEUSER")){_entitlement.admin.deleteUser=true;}
			});
			return _entitlement;
		}
	}
	
    }]);
  
  
  
  
  
  