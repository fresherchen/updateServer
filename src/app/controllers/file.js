'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Files = mongoose.model('Files'),
  errorHandler = require('./errors'),
  fileLoad = require('./file-load'),
  fs = require('fs'),
  _ = require('lodash');


exports.index = function(req, res) {
  res.render('index', {
    title: 'UpdateService',
    content: 'The UpdateService server is running ~'
  });
};

exports.getApi = function(req,res){
  var varUrl = (req.url).split('/');
  var filename = varUrl[2];
  var path = '/data/app/app/api/'+filename;

  fs.stat(path,function(err,s){
    if(!err && s.isFile()){
      var readable = fs.createReadStream(path,'utf-8');
      res.writeHead(200,{'Content-Type':'application/json'});
      readable.pipe(res);
    }else{
      res.json({ message: 'Failed to load '+filename });
    }
  });
};

// file create
exports.create = function(req,res){
  var file = req.files.file,
    filename = file.originalFilename,
    retVal = fileLoad.parseFilename(filename);

  var readyFile = new Files(retVal);
  Files.find({ updateFile: readyFile.updateFile }).exec(function(err,databack){
    if(!databack.length){
      readyFile.save(function(err, item){
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          res.json(item);
        }
      });
    }else{
      res.json({message:'this '+readyFile.updateFile+' has existed !!!'});
    }
  });
};

// file read
exports.read = function(req,res){
  res.json(req.file);
};

// file list
exports.list = function(req,res){
  var parseBuild = function(preBuild){
    var retBuild = preBuild.split('-');
    if(retBuild.length !== 2){
      res.json({ message: 'Oops, bad buildStart/buildEnd format!!!' });
      return;
    }
    return retBuild[1];
  };
  var searchCon = {};
  if(req.query){
    if(req.query.image){
      searchCon.image = req.query.image;
    }else{
      res.json({ message: 'Oops, bad image!!!' });
      return;
    }
    var buildStart = parseBuild(req.query.buildStart),
      buildEnd = parseBuild(req.query.buildEnd);
    if(buildStart && buildEnd && (buildStart<buildEnd)){
      searchCon.buildEnd = {$gt:buildStart,$lte:buildEnd};
    }else{
      res.json({ message:'Oops, bad buildStart/buildEnd format!!!' });
      return;
    }
    if(req.query.updateFile){
      searchCon.updateFile = req.query.updateFile;
    }
  }
  Files.find(searchCon).sort({ buildEnd: 1 }).exec(function(err,files){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      res.json(files);
    }
  });
};

// file update image/updateFile
exports.update = function(req,res){

  var file = req.file,
    originalFilename = req.file.updateFile,
    currentFilename = req.body.updateFile,
    retVal = fileLoad.parseFilename(currentFilename);
  Files.find({updateFile: currentFilename}).exec(function(err,databack){
    if(!databack.length){
      var readyFile  = _.extend(file, retVal);
      readyFile.save(function(err){
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          fileLoad.renamefile(originalFilename, currentFilename,function(path){
            res.json(path);
          });
        }
      });
    }else{
      res.json({ message: currentFilename+' is existed!!!' });
    }
  });
};

// file delete
exports.delete = function(req,res){
  var file = req.file;

  file.remove(function(err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }else{
      fileLoad.removefile(file.updateFile,function(back){
        res.json(back);
      });
    }
  });
};

exports.fileById = function(req,res,next,id){
  Files.findById(id).exec(function(err,file){
    if(err){
      return next(err);
    }
    if(!file){
      res.json({message: 'Failed to load the file'});
      return next('Failed to load the file');
    }
    req.file = file;
    next();
  });
};
