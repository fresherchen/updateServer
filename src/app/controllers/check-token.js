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
    var imageBack = [],
      require;
    for(var i in req.body){
      var imageObj = req.body[i];
      if(!imageObj){
        res.send({ message: 'Oops, image and buildEnd params are demanded!!!' });
        return;
      }
      if(!imageObj.image){
        res.send({ message: 'Oops, image params is demanded!!!' });
        return;
      }
      if(!imageObj.buildEnd){
        res.send({ message: 'Oops, buildEnd params is demanded!!!' });
        return;
      }
      var image = imageObj.image;
      require = http.get('http://reg.leadstec.com/v2/'+image+'/tags/list',function(response){
        response.on('data',function (chunk) {
          var images = JSON.parse(chunk),
            ascTags = images.tags.sort(),
            latestVersionBuild = ascTags[ascTags.length-2].split('-');
          // console.dir(ascTags);
          if(latestVersionBuild.length !== 2){
            res.send({ message: 'Oops, Something wrong with the Image tags!!!' });
            return;
          }
          var latestBuild = latestVersionBuild[1],
            returnVal = {
            image:image,
            versionBuild:ascTags[ascTags.length-2]
          };
          if(req.query.buildEnd === latestBuild) {
            returnVal.update = false;
            imageBack.push(returnVal);
          }else{
            returnVal.update = true;
            imageBack.push(returnVal);
          }
          if(imageBack.length === req.body.length){
            res.json(imageBack);
          }
        });
      });
    }
    require.on('error', function(e) {
      console.log('get error: ' + e.message);
    });
  };
