$(document).ready(function() {
	$('#createCategory').validate({
		rules : {
			categoryName : {
				required : true,
				rangelength : [ 2, 100 ]
			},
			categoryDescr : {
				required : true,
				rangelength : [ 1, 1000 ]
			},
			categoryImg : {
				rangelength : [ 0, 1000 ]
			},
			categoryCode : {
				required : true,
				rangelength : [ 0, 10 ]
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
