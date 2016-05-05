'use strict';
/**
 * Module dependencies
 */

var fs = require('fs'),
  Files = require('./file'),
  Path = require('path');
var mkdirp = require('mkdirp');
var os = require('os'),
    http = require('http');
var hostname = os.hostname();

exports.uploadfile = function(req,res){
  var file = req.files.file;
    if(!file) {
      res.send({message: 'No file is uploading!!!'});
      return;
    }
  var filename = file.originalFilename,
    path = file.path,
    retVaL = exports.parseFilename(filename,res);
  var secondPath = '/data/app/files_update',
    thirdPath = Path.join(secondPath,retVaL.image),
    readable = fs.createReadStream(path),
    writeable;

    fs.stat(secondPath, function (er, s){
      if(!er && s.isDirectory()){
        fs.stat(thirdPath, function (er, s){
          if(!er && s.isDirectory()){
            // console.dir('44444444444444444444');
            writeable = fs.createWriteStream(Path.join(thirdPath,filename));
            readable.pipe(writeable);
            Files.create(req,res);
          }else{
            fs.mkdir(thirdPath,function(err){
              if(err){
                return err;
              }else{
                // console.dir('3333333333333333333');
                writeable = fs.createWriteStream(Path.join(thirdPath,filename));
                readable.pipe(writeable);
                Files.create(req,res);
              }
            });
          }
        });
      }else{
        mkdirp(thirdPath,function(err){
          // console.dir('2222222222222222222');
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
};

exports.getlocation = function(req,res){
  var host = req.query.hostname;
  if(host === hostname){
    exports.downloadfile(req,res);
  }else{
    res.send({message: 'This method need to rewrite if needed!!!'});
    // var fs = require('fs');
    // var file = fs.createWriteStream('/data/app/files_update/'+ req.params.filename);
    // // 'http://192.168.2.102:41436/files/'+ req.params.filename +'/load'
    // var httprequest = http.get('http://'+host+'/files/'+ req.params.filename +'/load', function(response) {
    //   response.pipe(file);
      // res.sendFile('/data/app/files_update'+req.params.filename);
      // res.download('/data/file/'+req.params.filename,function(err){
      //   if(err){
      //     res.send({message: req.params.filename+' is not found!!!'});
      //   }
      // });
    // });
  }
};

exports.downloadfile = function (req,res){
  var filename = req.params.filename,
    vetVar = exports.parseFilename(filename),
    image = vetVar.image;
  res.download('/data/app/files_update/'+image+'/'+filename,function(err){
    if(err){
      res.send({message: filename+' is not found!!!'});
    }
  });
};

exports.renamefile = function (originalFilename, currentFilename,callback){
  var originalRetVal = exports.parseFilename(originalFilename),
    currentRetVal = exports.parseFilename(currentFilename);
  var originalPath = '/data/app/files_update/'+originalRetVal.image+'/'+originalFilename,
    currentPath = '/data/app/files_update/'+currentRetVal.image+'/'+currentFilename;
  fs.rename(originalPath, currentPath, function (back) {
    fs.stat(currentPath, function (err, stats) {
      if (err) throw err;
      callback('currentPath: ' + currentPath);
    });
  });
};

exports.removefile = function(filename,callback){
  var retVal = exports.parseFilename(filename);
  var path = '/data/app/files_update/'+retVal.image+'/'+filename;
  fs.unlink(path, function (err) {
    if (err) throw err;
    callback({message:'Deleted Successfully!!!'});
  });
};

// image_version-buildStart_version-buildEnd.sh
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
    //  get this hostname
    console.log('----------local host: '+hostname);
  // var domainName = '192.168.2.102:41439';
  return {
    image: image,
    versionStart: versionStart,
    versionEnd: versionEnd,
    buildStart: buildStart,
    buildEnd: buildEnd,
    updateFile: orgfileName,
    hostname: hostname
  };
};
