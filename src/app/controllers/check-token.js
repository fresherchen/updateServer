'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    http = require('http');

exports.checkTokeninUrl = function(req,res,next){
    // the check method need to write
    console.dir('the checkTokeninUrl method need to add!!!');
    req.user = {'id': mongoose.Types.ObjectId(req.query.user)};
    next();
  };

exports.checkTokeninBody = function(req,res,next){
    // the check method need to write
    console.dir('the checkTokeninBody method need to add!!!');
    req.user = {'id': mongoose.Types.ObjectId(req.body.user)};
    next();
  };

// check for updating or not
exports.checkForUpdate = function(req,res){
    // console.dir(req.query);
    var image = req.query.image;
    var require = http.get('http://reg.leadstec.com/v2/'+image+'/tags/list',function(response){
        response.on('data',function (chunk) {
          var images = JSON.parse(chunk),
            ascTags = images.tags.sort(),
            latestVersionBuild = ascTags[ascTags.length-2].split('-');
          // console.dir(ascTags);
          if(latestVersionBuild.length !== 2){
            res.send({ message: 'Oops, Something wrong with the Image tags!!!'});
            return;
          }
          var latestBuild = latestVersionBuild[1];
          var returnVal = {
            image:image,
            versionBuild:ascTags[ascTags.length-2]
          };
          if(req.query.buildEnd === latestBuild) {
            returnVal.update = false;
            res.json(returnVal);
          }else{
            returnVal.update = true;
            res.json(returnVal);
          }
        });
    });
    require.on('error', function(e) {
      console.log('get error: ' + e.message);
    });
};
