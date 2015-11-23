'use strict';
/**
 * Module dependencies. 
 * @param {Object} app
 */
var checkToken = require('../../app/controllers/check-token'),
	fileUpDown = require('../../app/controllers/file-updown'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart();
	
module.exports = function(app){
	app.route('/uploadFile')
	.post(checkToken.checkTokeninBody,multipartMiddleware,fileUpDown.uploadfile);
	
	app.route('/download/:filename')
	.get(checkToken.checkTokeninUrl,fileUpDown.downloadfile);
};
