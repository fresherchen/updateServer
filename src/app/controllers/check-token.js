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
      temp = [],
      httprequest;
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
      var image = imageObj.image,
        preImage = image.split('/');
      if(preImage.length !== 2){
        res.send({ message: 'Oops, image params is demanded!!!' });
      }
      var hostname = preImage[0],
        imageName = preImage[1];
        temp.push({image:imageName,buildEnd:imageObj.buildEnd});
      httprequest = http.get('http://'+hostname+'/v2/'+imageName+'/tags/list',function(response){
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
            latestBuild:latestBuild,
            image:images.name,
            versionBuild:ascTags[ascTags.length-2]
          };
          imageBack.push(returnVal);
          if(imageBack.length === req.body.length){
            for(var t in temp){
              for(var r in imageBack){
                if(temp[t].image === imageBack[r].image){
                  if(temp[t].buildEnd === imageBack[r].latestBuild){
                    delete imageBack[r].latestBuild;
                    imageBack[r].update = false;
                  }else{
                    delete imageBack[r].latestBuild;
                    imageBack[r].update = true;
                  }
                }
              }
            }
            res.json(imageBack);
          }
        });
      });
    }
    httprequest.on('error', function(e) {
      console.log('get error: ' + e.message);
    });
  };
