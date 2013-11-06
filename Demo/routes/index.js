/*
 * GET home page.
 */
var commonDao = require('../dao/commonDao');
var index;

index = {
	index : function(req, res) {
		res.render('index');
	},
	
	login : function(req, res) {
		res.render('common/login');
	},

	logout : function(req, res) {
		req.logout();
		setLogInDetails(req,res);
		res.render('common/logout');
	},
	
	myProfile : function(req, res) {
		res.render('user/profile/myprofile');
	},
	
	findOrCreate : function(providerId,firstName,lastName,callback) {
		commonDao.getUserDetails(providerId,function(err,userObj) {
			if(userObj[0] && userObj[0].userId) {
				callback(err,userObj[0]);
			} else {
				commonDao.insertUserDetails(providerId,firstName,lastName,function(err,newUserObj){
					callback(err,newUserObj);
				}); 
			}
		});
	},
	
	authenticateUser : function(req, res,next) {
		if(req.isAuthenticated()) {
			return next();
		} else {
			res.render('common/login');
		}
	},
	
	authenticateAdmin : function(req, res,next) {
		if(req.isAuthenticated() && isAdmin(req.user)) {
			res.locals.isAdmin = true;
			return next();
		} else {
			res.render('common/login');
		}
	},
	
	setIsAuthenticated : function(req, res,next) {
		setLogInDetails(req,res);
		return next();
	}
};

function setLogInDetails(req,res) {
	res.locals.isAuthenticated = req.isAuthenticated();
	if(req.user) {
		if(req.user.displayName) {
			res.locals.displayName = req.user.displayName;
		}
		
		if(req.user.emails && req.user.emails[0]) {
			res.locals.userId = req.user.myUserId;
		}
		res.locals.isAdmin =isAdmin(req.user);
	}
}

function isAdmin(user) {
	if(user) {
		if(user.emails && user.emails[0].value == "sathyavikram@gmail.com") {
			return true;
		}
	}
	return false;
}

module.exports = index;