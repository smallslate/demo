var quizDao = require('../dao/quizDao');
var quiz;

quiz = {
//---------------------CATEGORY-------------------------
	createCategory : function(req, res) {
		res.render('user/admin/category',{categoryObj:quizDao.getCategoryById(null)});
	},
	
	getAllCategories : function(req, res) {
		quizDao.getAllCategories(function(err,result) {
			if (err) {
				res.send('error');
			} else {
				res.send(result);
			}
		});
	},
	
	crudCategory : function(req, res) {
		var categoryObj = req.body;
		var requestAction = categoryObj.action;
		delete categoryObj.action;
		
		if(requestAction == 'create') {
			delete categoryObj.categoryId;
			//todo server side validate category object
			quizDao.saveNewCategory(categoryObj,function(err,result) {
				if (err) {
					console.log("quizDao - create Category "+err);
					categoryObj.error='Cannot Save Category Data.Please Try Again';
    			  } else {
    				  categoryObj.success='Category Data Saved Successfully';
    				  if(result.insertId && result.insertId!=0) {
    					  categoryObj.categoryId = result.insertId;
    				  }
    			  }
				res.render('user/admin/category',{categoryObj:categoryObj});
			});
		} else if(requestAction == 'update') {
			//todo server side validate category object
			quizDao.updateCategory(categoryObj,function(err,result) {
				if (err) {
					console.log("quizDao - update Category "+err);
					categoryObj.error='Cannot Update Category Data.Please Try Again';
    			  } else {
    				  categoryObj.success='Category Data Updated Successfully';
    			  }
				res.render('user/admin/category',{categoryObj:categoryObj});
			});
		} else if(requestAction == 'delete') {
			quizDao.deleteCategory(categoryObj.categoryId,function(err,result) {
				if (err) {
					console.log("quizDao - delete Category "+err);
					categoryObj.error='Cannot Delete Category.Please Try Again';
    			  } else {
    				  categoryObj = quizDao.getCategoryById(null);
    				  categoryObj.success='Category Deleted Successfully';
    			  }
				res.render('user/admin/category',{categoryObj:categoryObj});
			});
		}
	},
//---------------------SUB CATEGORY-------------------------	
	createSubCategory: function(req, res) {
		quizDao.getAllCategories(function(err,allCategories) {
			if (err) {
				res.send('error');
			} else {
				res.render('user/admin/subCategory',{subCategoryObj:quizDao.getSubCategoryById(null),categories:allCategories});
			}
		});
	},
	
	getSubCategoriesByCategoryId : function(req, res) {
		quizDao.getSubCategoriesByCategoryId(req.query.categoryId,function(err,result) {
			if (err) {
				res.send('error');
			} else {
				res.send(result);
			}
		});
	},
	
//---------------------EXAM-------------------------
	
	createExam : function(req, res) {
		res.render('user/createExam/createExam');
	},
	
	myExams : function(req, res) {
		res.render('user/profile/myExams');
	},
	
	myExamList : function(req, res) {
		quizDao.getQuizListByCreatedUser(res.locals.userId,function(err,quizList){
			res.render('user/profile/myExamList',{quizList:quizList});
		});
	},
	
	//getQuizListByCreatedUser
	
	getExamDetailsForEdit : function(req, res) {
		quizDao.getQuizDetailsByQuizId(req.query.examId,function(err,quizObjList) {
			if((quizObjList[0].createdBy == res.locals.userId || res.locals.isAdmin) && (quizObjList && quizObjList.length>0)) {
				var quizObj = quizObjList[0];
				quizDao.getQuestionListByExamId(quizObj.quizId,function(err,questionList) {
					quizObj.questionList = questionList;
					res.send(quizObj);
				});
			} else {
				res.send(null);
			}
		});
	},
	
	crudQuizDetails : function(req, res) {
		var quizObj = req.body;
		var requestAction = quizObj.action;
		delete quizObj.action;
		
		quizObj.updatedBy = res.locals.userId;
		quizObj.updatedDate = new Date();
		if(requestAction == 'create') {
			quizObj.createdBy = res.locals.userId;
			quizObj.createdDate = new Date();
			quizDao.saveNewQuizDetails(quizObj,function(err,result) {
				if (err) {
					console.log("quizDao - crudQuizDetails - create new "+err);
					quizObj.error='Cannot Save Details.Please Try Again';
    			  } else {
    				  quizObj.success='Data Saved Successfully';
    				  if(result.insertId && result.insertId!=0) {
    					  quizObj.quizId = result.insertId;
    				  }
    			  }
				res.send(quizObj);
			});
		} else if(requestAction == 'update' || requestAction == 'addQuestions') {
			quizDao.getQuizDetailsByQuizId(quizObj.quizId,function(err,quizObjList) {
				if (err) {
					console.log("quizDao - crudQuizDetails -getQuizDetailsByQuizId update "+err);
					quizObj.error='Cannot Updated Details.Please Try Again';
					res.send(quizObj);
    			  } else {
    				  if(quizObjList[0].createdBy == res.locals.userId || res.locals.isAdmin) {
    						quizDao.updateQuizDetails(quizObj,function(err,result) {
    							if (err) {
    								console.log("quizDao - crudQuizDetails - update "+err);
    								quizObj.error='Cannot Updated Details.Please Try Again';
    								res.send(quizObj);
    			    			  } else {
    			    				  quizObj.success='Data Updated Successfully';
    			    				  quizDao.getQuestionListByExamId(quizObj.quizId,function(err,questionList) {
    			    						quizObj.questionList = questionList;
    			    						res.send(quizObj);
    			    				  });
    			    			  }
    						});
    				  } else {
    					  quizObj.error='You Do not have Access to Modify this Quiz Details';
    					  res.send(quizObj);
    				  }
    			  }
			});
		} 
	},
	//---------------------EXAM QUESTIONS-------------------------
	crudQuestionDetails : function(req, res) {
		var quizObj = req.body;
		var requestAction = quizObj.questionObj.action;
		delete  quizObj.questionObj.action;delete quizObj.action;
		delete quizObj.error;delete quizObj.success;quizObj.questionObj.error;delete quizObj.questionObj.success;
		
		quizObj.questionObj.updatedBy = res.locals.userId;
		for(var k=0;k<quizObj.questionObj.options.length;k++) {
			switch (k) {
				case 0:
					quizObj.questionObj.option1 = quizObj.questionObj.options[k].option;
					quizObj.questionObj.option1IsRich = quizObj.questionObj.options[k].optionIsRich;
				  break;
				case 1:
					quizObj.questionObj.option2 = quizObj.questionObj.options[k].option;
					quizObj.questionObj.option2IsRich = quizObj.questionObj.options[k].optionIsRich;
				  break;
				case 2:
					quizObj.questionObj.option3 = quizObj.questionObj.options[k].option;
					quizObj.questionObj.option3IsRich = quizObj.questionObj.options[k].optionIsRich;
				  break;
				case 3:
					quizObj.questionObj.option4 = quizObj.questionObj.options[k].option;
					quizObj.questionObj.option4IsRich = quizObj.questionObj.options[k].optionIsRich;
				  break;
				case 4:
					quizObj.questionObj.option5 = quizObj.questionObj.options[k].option;
					quizObj.questionObj.option5IsRich = quizObj.questionObj.options[k].optionIsRich;
				  break;
			}
		}
		
		var optionsList =  quizObj.questionObj.options;
		delete  quizObj.questionObj.options;
		quizObj.questionObj.quizId = quizObj.quizId;
		if(requestAction == 'create') {
			quizDao.saveNewQuestionDetails(quizObj.questionObj,function(err,result) {
				if (err) {
					console.log("quizDao - crudQuestionDetails - create new Question "+err);
					quizObj.questionObj.error='Cannot Save Details.Please Try Again';
					res.send(quizObj);
   			  	} else {
   			  	quizObj.questionObj.success='Data Saved Successfully';
    				  if(result.insertId && result.insertId!=0) {
    					  quizObj.questionObj.questionId = result.insertId;
    					  quizObj.questionObj.options = optionsList;
    				  }
    				  quizDao.getQuestionListByExamId(quizObj.quizId,function(err,questionList) {
  						quizObj.questionList = questionList;
  						res.send(quizObj);
    				  });
    			  }
			});
		} if(requestAction == 'update') {
			quizDao.getQuizDetailsByQuizId(quizObj.quizId,function(err,quizObjList) {
				if (err) {
					console.log("quizDao - crudQuestionDetails -getQuizDetailsByQuizId update "+err);
					quizObj.questionObj.error='Cannot Updated Details.Please Try Again';
					res.send(quizObj);
    			  } else {
    				  if(quizObjList[0].createdBy == res.locals.userId || res.locals.isAdmin) {
    						quizDao.updateQuestionDetails(quizObj.questionObj,function(err,result) {
    							if (err) {
    								console.log("quizDao - crudQuestionDetails - update "+err);
    								quizObj.questionObj.error='Cannot Updated Details.Please Try Again';
    								quizObj.questionObj.options = optionsList;
        							res.send(quizObj);
    			    			  } else {
    			    				  quizObj.questionObj.success='Data Updated Successfully';
    			    				  quizObj.questionObj.options = optionsList;
    			    				  quizDao.getQuestionListByExamId(quizObj.quizId,function(err,questionList) {
    			    					  quizObj.questionList = questionList;
    			    					  res.send(quizObj);
    			      				  });
    			    			  }
    						});
    				  } else {
    					  quizObj.questionObj.error='You Do not have Access to Modify this Quiz Details';
    					  res.send(quizObj);
    				  }
    			  }
			});
		} 
	}
};
module.exports = quiz;