angular.module('createExam.service', [ 'ngResource' ])
	.factory('createExamService',[ '$resource', function($resource) {
			return $resource('/user/crudQuizDetails', {}, {
				saveExamDetails : {method : 'POST'}
			});
	}]).factory('createQuestionService',[ '$resource', function($resource) {
		return $resource('/user/crudQuestionDetails', {}, {
			saveQuestionDetails : {method : 'POST'}
		});
	}]).factory('editExamService', [ '$resource', function($resource) {
		return $resource('/user/getExamDetailsForEdit', {}, {
			getExamDetailsForEdit : {method : 'GET'}
	});
}]);


