angular.module('quizServices', [ 'ngResource' ])
	.factory('categories',[ '$resource', function($resource) {
			return $resource('/getAllCategories', {}, {
				query : {method : 'GET',isArray : true}
			});
		} ])
	.factory('subCategories', [ '$resource', function($resource) {
			return $resource('/getSubCategoriesByCategoryId', {}, {
				query : {method : 'GET',isArray : true}
			});
	}]);