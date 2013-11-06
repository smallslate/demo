// Declare app level module which depends on filters, and services
angular.module('createExam', [
  'createExam.controllers','quizServices','createExam.service','quizDirective'
]);

$(document).ready(function() {
	$('#addQuestionForm').validate({
		ignore: 'input:hidden:not(input:hidden.required)',
		rules : {
			questionType : {
				required : true
			},
			question : {
				required : true,
				minlength : 2
			},
			option1 : {
				required : true,
				minlength : 1
			},
			option2 : {
				required : true,
				minlength : 1
			},
			answer : {
				required : true,
				minlength : 1
			}
		},
		highlight : function(element) {
			alert(1);
			onValidationHighlight(element);
		},
		success : function(element) {
			alert(2);
			onValidationSuccess(element);
		}
	});
	
	$('#examDetailsForm').validate({
		ignore: 'input:hidden:not(input:hidden.required)',
		rules : {
			quizName : {
				required : true,
				minlength : 2,
			},
			quizDescr : {
				required : true,
				minlength : 5,
			},
			categoryId : {
				required : true,
				rangelength : [ 1, 100 ]
			},
			subCategoryId : {
				required : true,
				rangelength : [ 1, 100 ]
			},
			quizImgUrl : {
				rangelength : [ 0, 1000 ]
			}
		},
		highlight : function(element) {
			onValidationHighlight(element);
		},
		success : function(element) {
			onValidationSuccess(element);
		}
	});
});

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for ( var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                    return sParameterName[1];
            }
    }
}