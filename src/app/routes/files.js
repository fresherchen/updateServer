'use strict';

/**
 * Module dependencies
 */
var checkToken = require('../../app/controllers/check-token'),
  fileLoad = require('../../app/controllers/file-load'),
  multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  file = require('../../app/controllers/file');

module.exports = function(app){

  app.route('/').get(file.index);

  app.route('/files')
  .get(checkToken.checkTokeninUrl,file.list)
  .post(checkToken.checkTokeninBody,multipartMiddleware,fileLoad.uploadfile);

  app.route('/files/:fileId')
  .get(checkToken.checkTokeninUrl,file.read)
  .post(checkToken.checkTokeninBody,file.update)
  .delete(checkToken.checkTokeninBody,file.delete);

  app.route('/files/:filename/download')
  .get(checkToken.checkTokeninUrl,fileLoad.getlocation);

  app.route('/files/:filename/load')
  .get(checkToken.checkTokeninUrl,fileLoad.downloadfile);

  app.param('fileId',file.fileById);
};
