'use strict';

/**
 * Module dependencies
 */
var checkToken = require('../../app/controllers/check-token'),
  fileUpDown = require('../../app/controllers/file-updown'),
  multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  file = require('../../app/controllers/file');

module.exports = function(app){

  app.route('/').get(file.index);

  app.route('/files')
  .get(checkToken.checkTokeninUrl,file.list)
  .post(checkToken.checkTokeninBody,multipartMiddleware,fileUpDown.uploadfile);

  app.route('/files/:fileId')
  .get(checkToken.checkTokeninUrl,file.read)
  .post(checkToken.checkTokeninBody,file.update)
  .delete(checkToken.checkTokeninBody,file.delete);

  app.route('/files/:filename/download')
  .get(checkToken.checkTokeninUrl,fileUpDown.downloadfile);

  app.param('fileId',file.fileById);
};
