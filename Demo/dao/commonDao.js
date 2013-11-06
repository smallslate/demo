var dbconnection = require('./dbconnection');
var commonDao;

commonDao = {
	getUserDetails : function(providerUserId,callback) {
		dbconnection.query("select * from userdetails where providerid ='"+providerUserId+"'",function(err,result) {
			callback(err, result);
		});
	},
	
	insertUserDetails : function(providerUserId,firstName,lastName,callback) {
		dbconnection.query("insert into userdetails set providerId = '"+providerUserId+"',firstName='"+firstName+"',lastName ='"+lastName+"'",function(err,insertresult) {
			if(!err) {
				dbconnection.query("select * from userdetails where providerid = ?",providerUserId,function(err,userObj) {
					callback(err, userObj);
				});
			} else {
				callback(err, null);
			}
		});
	}
};

module.exports = commonDao;