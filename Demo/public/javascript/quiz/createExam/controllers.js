/* Controllers */

angular.module('createExam.controllers', []).
  controller('createExamCtrl', ['$scope','$window','categories','subCategories','createExamService','createQuestionService','editExamService',
                                function($scope,$window,categories,subCategories,createExamService,createQuestionService,editExamService) {
	  
	  $scope.categoryList = categories.query();
	  $scope.questionNumberForEdit =0;
	  var examId = getURLParameter('examid');
	  if(examId && examId>0) {
		  $scope.quizObj = editExamService.getExamDetailsForEdit({examId:examId},function(data){
			  $scope.subCategoryList  = subCategories.query({categoryId:$scope.quizObj.categoryId}); 
		  });
	  }
	  
	  $scope.getSubCategoryList = function() {
		  $scope.quizObj.subCategoryId ='';
		  if($scope.quizObj.categoryId) {
			  $scope.subCategoryList  = subCategories.query({categoryId:$scope.quizObj.categoryId});  
		  } else {
			  $scope.subCategoryList = [];
		  }
	  };
	  
	  $scope.saveQuizDetails = function(action) {
		  for(var instance in CKEDITOR.instances) { 
			  CKEDITOR.instances[instance].updateElement();
		  }
		  if($('#examDetailsForm').valid()) {	
			  delete $scope.quizObj.error;
			  delete $scope.quizObj.success;
			  $scope.quizObj.action= action;
			  var editedQuizObj = $scope.quizObj;
			  delete editedQuizObj.questionList;
			  $scope.quizObj = createExamService.saveExamDetails(editedQuizObj);
			  if(action =='addQuestions') {
				  $('#createExamTab a[href="#examQuestions"]').tab('show');
			  }
			  $scope.questionNumberForEdit =0;
		  }
	  };
	  
	  $scope.addNewQuestion = function(questionType) {
		  if($scope.quizObj && $scope.quizObj.quizId && $scope.quizObj.quizId>0) {
			  $scope.isShowAddQuestion =true;
			  if(!$scope.quizObj.questionObj) {
				  $scope.quizObj.questionObj = new Object();
			  }
			  $scope.quizObj.questionObj.questionType= questionType;
			  $scope.quizObj.questionObj.difficultyLevel =0;
			  $scope.quizObj.questionObj.questionIsRich = false;
			  $scope.quizObj.questionObj.answerDescrIsRich = false;
			  $scope.quizObj.questionObj.option3IsRich = false;
			  $scope.quizObj.questionObj.option4IsRich = false;
			  $scope.quizObj.questionObj.option5IsRich = false;
			  $scope.quizObj.questionObj.options=[{option:"",optionIsRich:false},{option:"",optionIsRich:false}];
			  $scope.questionNumberForEdit =0;
		  } else {
			  alert("Please add exam details before adding questions");
			  $('#createExamTab a[href="#examDetails"]').tab('show');
		  }
	  };
	  
	  $scope.editQuestion = function() {
		  if($scope.questionNumberForEdit >0) {
			  $scope.isShowAddQuestion =true;
			  if(!$scope.quizObj.questionObj) {
				  $scope.quizObj.questionObj = new Object();
			  }
			  $scope.quizObj.questionObj = $scope.quizObj.questionList[$scope.questionNumberForEdit-1];
		  } else {
			  $scope.isShowAddQuestion =false;
		  }
		  
	  };
	  
	  $scope.saveQuestionForm = function(action) {
		  for(var instance in CKEDITOR.instances) { 
			  CKEDITOR.instances[instance].updateElement();
		  }
		  if($('#addQuestionForm').valid()) {
			  delete $scope.quizObj.questionObj.error;
			  delete $scope.quizObj.questionObj.success;
			  if(action=="create") {
				  if($scope.quizObj.questionList) {
					  $scope.quizObj.questionObj.questionNumber = $scope.quizObj.questionList.length+1;
				  } else {
					  $scope.quizObj.questionObj.questionNumber = 1;
				  }
			  }
			  $scope.quizObj.questionObj.action= action;
			  var editedQuizObj = $scope.quizObj;
			  delete editedQuizObj.questionList;
			  $scope.quizObj = createQuestionService.saveQuestionDetails(editedQuizObj);
			  $scope.questionNumberForEdit =0;
		  }
	  };
	  
	  $scope.closeQuestionForm = function() {
		  if(confirm("Are you sure you want to cancel? All data you have entered will be lost !")) {
			  $scope.isShowAddQuestion =false;  
			  $scope.questionNumberForEdit =0;
		  }
	  };
	  
	  $scope.addAdditionalOption = function() {
		  $scope.quizObj.questionObj.options.push({option:"",optionIsRich:false});
	  };
	  
	  $scope.deleteAdditionalOption = function(index) {
		  if(confirm("Do you want to remove this option? Data you have entered for this Option will be lost")) {
			  $scope.quizObj.questionObj.options.splice(index,1);
		  }
	  };
}]);


