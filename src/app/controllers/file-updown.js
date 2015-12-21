'use strict';
/**
 * Module dependencies 
 */

var fs = require('fs'),
  url = require('url'),
  Files = require('./file');  
var Path = require('path');

exports.uploadfile = function(req,res){
  
  var file = req.files.file,
    filename = file.originalFilename,
    path = file.path,
    retVaL = exports.parseFilename(filename,res);
  var secondPath = '/data/file',
    thirdPath = Path.join(secondPath,retVaL.image),
    readable = fs.createReadStream(path),
    writeable;

    fs.exists(secondPath, function (exists) {
      if(exists){
        fs.exists(thirdPath, function (exists) {
          if(exists){
            // console.dir('44444444444444444444');
              
            writeable = fs.createWriteStream(Path.join(thirdPath,filename));
            readable.pipe(writeable);
            Files.create(req,res);
          }else{
            fs.mkdir(thirdPath,function(err){
                  // console.dir("333333333333333333");
                  if(err) {
                    return err;
                  }else{
                writeable = fs.createWriteStream(Path.join(thirdPath,filename));
                readable.pipe(writeable);
                Files.create(req,res);
                  }
            });
          }
        });
      }else{
        fs.mkdir(secondPath,function(err){
              // console.dir("2222222222222222222");
              if(err) {
                return err;
              }else{
                fs.mkdir(thirdPath,function(err){
                  if(err) {
                    return err;
                  }else{
                writeable = fs.createWriteStream(Path.join(thirdPath,filename));
                readable.pipe(writeable);
                Files.create(req,res);
                  }
            });
              }
        });
      }
    });
};

exports.downloadfile = function(req,res){
  var filename = req.params.filename,
    vetVar = exports.parseFilename(filename),
    image = vetVar.image;
  res.download('/data/file/'+image+'/'+filename,filename,function(err){
    if(err){
      res.send({message: filename+' is not found!!!'});
    }
  });
};

exports.renamefile = function(originalFilename, currentFilename,callback){
  var originalRetVal = exports.parseFilename(originalFilename),
    currentRetVal = exports.parseFilename(currentFilename);
  var originalPath = '/data/file/'+originalRetVal.image+'/'+originalFilename,
    currentPath = '/data/file/'+currentRetVal.image+'/'+currentFilename;
  fs.rename(originalPath, currentPath, function (back) {
    fs.stat(currentPath, function (err, stats) {
      if (err) throw err;
      callback('currentPath: ' + currentPath);
    });
  });
};

exports.removefile = function(filename,callback){
  var retVal = exports.parseFilename(filename);
  var path = '/data/file/'+retVal.image+'/'+filename;
  fs.unlink(path, function (err) {
    if (err) throw err;
    callback({message:'Deleted Successfully!!!'});
  });
};

// image_version-build_version-build.sh
exports.parseFilename = function(orgfileName,res){
  if(!orgfileName){
    res.send({message: 'File name is null!!!'});
    return;
  }
  var filename = orgfileName.replace('.sh','');
  var allVar = filename.split('_');
    if(allVar.length !== 3){
      res.send({message:'Oops, the filename format is not correct!!!'});
      return;
    }
  var image = allVar[0];
  var startVal = allVar[1].split('-');
    if(startVal.length !==2){
      res.send({message:'Oops, the filename format is not correct!!!'});
      return;
    }
  var versionStart = startVal[0],
    buildStart = parseInt(startVal[1]);
  var endVal = allVar[2].split('-');
    if(endVal.length !==2){
      res.send({message:'Oops, the filename format is not correct!!!'});
      return;
    }
  var versionEnd = endVal[0],
    buildEnd = parseInt(endVal[1]);
  var domainName = '192.168.2.102:41439';
    return {
      image: image,
      versionStart: versionStart,
      versionEnd: versionEnd,
      buildStart: buildStart,
      buildEnd: buildEnd,
      deltaFile: orgfileName,
      domainName: domainName
    };
};