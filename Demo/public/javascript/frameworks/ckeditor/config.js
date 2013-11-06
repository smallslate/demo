/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbar = [
	              	{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'TextColor', 'BGColor','NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'] },
	              	{ name: 'links', items: [ 'Link', 'Image'] },
	              	{ name: 'styles', items: ['FontSize','Font','Styles', 'Format'] },
	              	{ name: 'tools', items: [ 'Maximize','Preview'] }
	              ];
};
