'use strict';

/**
 * Module dependencies 
 */
var checkToken = require('../../app/controllers/check-token'),
	file = require('../../app/controllers/file');	

module.exports = function(app){
	app.route('/file')
	.get(checkToken.checkTokeninUrl,file.list);
	
	app.route('/file/:fileId')
	.get(checkToken.checkTokeninUrl,file.read)
	.put(checkToken.checkTokeninBody,file.update)
	.delete(checkToken.checkTokeninBody,file.delete);
	
	app.param('fileId',file.fileById);
};