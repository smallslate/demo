var dbconnection = require('./dbconnection');
var quizDao;
quizDao = {
//---------------------CATEGORY-------------------------
	getCategoryById : function(categoryId) {
		if(categoryId ==null) {
			return getEmptyCategoryObj();
		}
	},
	
	getAllCategories : function(callback) {
		dbconnection.query('select * from category where isPublished = "Y" order by categoryName', function(err,result) {
			callback(err, result);
		});
	},
	
	saveNewCategory : function(categoryObj,callback) {
		dbconnection.query('INSERT INTO category SET ?', categoryObj, function(err,result) {
			callback(err, result);
		});
	},
	
	updateCategory : function(categoryObj,callback) {
		dbconnection.query('UPDATE category SET categoryName = "'+ categoryObj.categoryName + '",categoryDescr="' + categoryObj.categoryDescr + '", categoryImg="' + categoryObj.categoryImg 
				+ '",categoryCode="' + categoryObj.categoryCode + '" WHERE categoryId ='+ categoryObj.categoryId, function(err, result) {
			callback(err, result);
		});
	},
	
	deleteCategory : function(categoryId,callback) {
		dbconnection.query('delete from category where categoryid ='+categoryId, function(err, result) {
			callback(err, result);
		});
	},
//---------------------SUB CATEGORY-------------------------	
	getSubCategoryById : function(subCategoryId) {
		if(subCategoryId == null) {
			return getEmptySubCategoryObj();
		}
	},
	
	getSubCategoriesByCategoryId : function(categoryId,callback) {
		dbconnection.query('select * from subcategory where categoryId = '+categoryId+' and isActive ="Y" order by subCategoryName', function(err,result) {
			callback(err, result);
		});
	},
//---------------------QUIZ/EXAM DETAILS -------------------------	
	getQuizDetailsByQuizId : function(quizId,callback) {
		dbconnection.query('select * from quizdetails where quizId =?',[quizId],function(err,result) {
			callback(err, result);
		});
	},

	getQuizListByCreatedUser : function(userId,callback) {
		dbconnection.query('select * from quizdetails where createdBy =?',[userId],function(err,result) {
			callback(err, result);
		});
	},
	
	saveNewQuizDetails : function(quizObj,callback) {
		dbconnection.query("INSERT INTO quizdetails SET ?", quizObj, function(err,result) {
			callback(err, result);
		});
	},
	
	updateQuizDetails : function(quizObj,callback) {
		dbconnection.query("update quizdetails set quizName='"+quizObj.quizName+"',quizDescr='"+quizObj.quizDescr+"',categoryId="+quizObj.categoryId+",subCategoryId="+quizObj.subCategoryId+",quizImgUrl='"+quizObj.quizImgUrl+"',updatedBy="+quizObj.updatedBy+" where quizId ="+quizObj.quizId,function(err,result) {
			callback(err, result);
		});
	},
	
//---------------------QUESTION DETAILS -------------------------
	getQuestionListByExamId : function(examId,callback) {
		dbconnection.query("select * from questionDetails where quizId=? and isActive='Y'", examId, function(err,questionList) {
			callback(err, questionList);
		});
	},	

	saveNewQuestionDetails : function(questionObj,callback) {
		dbconnection.query("INSERT INTO questionDetails SET ?", questionObj, function(err,result) {
			callback(err, result);
		});
	},
	
	updateQuestionDetails : function(questionObj,callback) {
		dbconnection.query("update questionDetails set question='"+questionObj.question+"',questionIsRich='"+questionObj.questionIsRich+"'," +
				"option1='"+questionObj.option1+"',option1IsRich='"+questionObj.option1IsRich+"',option2='"+questionObj.option2+"',option2IsRich='"+questionObj.option2IsRich+"',"+
				"option3='"+questionObj.option3+"',option3IsRich='"+questionObj.option3IsRich+"',option4='"+questionObj.option4+"',option4IsRich='"+questionObj.option4IsRich+"',"+
				"option5='"+questionObj.option5+"',option5IsRich='"+questionObj.option5IsRich+"',answer='"+questionObj.answer+"',answerDescr='"+questionObj.answerDescr+"',"+
				"answerDescrIsRich='"+questionObj.answerDescrIsRich+"',questionType='"+questionObj.questionType+"',updatedBy="+questionObj.updatedBy+",difficultyLevel='"+
				questionObj.difficultyLevel+"' where questionId="+questionObj.questionId+" AND quizId = "+questionObj.quizId,function(err,result) {
					callback(err, result);
		});
	}
};


function getEmptyCategoryObj() {
	return {categoryId:'',categoryName:'',categoryDescr:'',categoryImg:'',categoryCode:'',isPublished:''};
}

function getEmptySubCategoryObj() {
	return {subCategoryId:'',subCategoryName:'',categoryId:'',subCategoryDescr:'',subCategoryImg:'',subCategoryCode:''};
}
module.exports = quizDao;