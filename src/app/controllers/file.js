'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Files = mongoose.model('Files'),
  errorHandler = require('./errors'),
  fileLoad = require('./file-load'),
  fs = require('fs'),
  index = require('../../dbconf/index'),
  querystring = require('querystring'),
  _ = require('lodash');


exports.index = function(req, res) {
  res.render('index', {
    title: 'UpdateService',
    content: 'The UpdateService server is running ~'
  });
};

// file create
exports.create = function(req,res){
  var file = req.files.file,
    filename = file.originalFilename,
    retVal = fileLoad.parseFilename(filename);
  if(retVal.message){
    res.json(retVal);
    return;
  }

  var readyFile = new Files(retVal);
  if(index.dbMode === 'json-server'){
    var path = req.path+'?'+querystring.stringify({updateFile: readyFile.updateFile});
    index.operations(path,'','',function(data){
      if(!JSON.parse(data).length){
        index.operations(req.path,req.method,readyFile,function(returnData){
          res.json(JSON.parse(returnData));
        });
      }else{
        res.json({message:'This '+readyFile.updateFile+' has existed !!!'});
      }
    });
  }else if(index.dbMode === 'mongo'){
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
        res.json({message:'This '+readyFile.updateFile+' has existed !!!'});
      }
    });
  }
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
  var searchCon = {}, count, limit, sort;
  if(req.query){
    if(req.query.image){
      searchCon.image = req.query.image;
    }else{
      res.json({ message: 'Oops, bad image!!!' });
      return;
    }
    var buildStart = req.query.buildStart,
      buildEnd = req.query.buildEnd;
    if(buildStart && buildEnd && (buildStart<buildEnd)){
      buildStart = parseBuild(buildStart),
      buildEnd = parseBuild(buildEnd);
      searchCon.buildEnd = {$gt:buildStart,$lte:buildEnd};
      if(index.dbMode === 'json-server'){
        delete searchCon.buildEnd;
        searchCon.buildEnd_gte = ++buildStart;
        searchCon.buildEnd_lte = buildEnd;
      }
    }else{
      res.json({ message:'Oops, bad buildStart/buildEnd format!!!' });
      return;
    }
    if(req.query.updateFile){
      searchCon.updateFile = req.query.updateFile;
    }
    if(req.query.count && req.query.limit){
      limit = req.query.limit;
      count = (req.query.count-1)*limit;
    }
    sort = req.query.sort ? req.query.sort : 'buildEnd';
  }
  if(index.dbMode === 'json-server'){
    var _sort = '&_sort='+sort;
    var _limit = '&_limit='+limit;
    var path = req.path+'?'+querystring.stringify(searchCon)+_sort;
    if(limit)
      path = path+_limit;
    index.operations(path,req.method,'',function(data){
      res.json(JSON.parse(data));
    });
  }else if(index.dbMode === 'mongo'){
    Files.find(searchCon).sort(sort).skip(count).limit(limit).exec(function(err,files){
      if(err){
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }else{
        res.json(files);
      }
    });
  }
};

// file update image/updateFile
exports.update = function(req,res){

  var file = req.file,
    originalFilename = req.file.updateFile,
    currentFilename = req.body.updateFile,
    retVal = fileLoad.parseFilename(currentFilename);
  if(retVal.message){
    res.json(retVal);
    return;
  }
  var readyFile  = _.extend(file, retVal);
  if(index.dbMode === 'json-server'){
    var urlVar = (req.path).split('/');
    var path = '/'+urlVar[1]+'?'+querystring.stringify({updateFile: currentFilename});
    index.operations(path, '', '', function(data){
      console.dir(JSON.parse(data).length);
      if(!JSON.parse(data).length){
        index.operations(req.path,'PUT',readyFile,function(returnData,code){
          if(code === 200)
            fileLoad.renamefile(originalFilename, currentFilename,function(path){
              res.json(path);
            });
        });
      }else if(JSON.parse(data).length){
        if(JSON.parse(data)[0]._id === readyFile._id){
          index.operations(req.path,'PUT',readyFile,function(returnData,code){
            if(code === 200)
              fileLoad.renamefile(originalFilename, currentFilename,function(path){
                res.json(path);
              });
          });
        }else{
          res.json({message:'This '+readyFile.updateFile+' has existed !!!'});
        }
      }else{
        res.json({message:'This '+readyFile.updateFile+' has existed !!!'});
      }
    });
  }else if(index.dbMode === 'mongo'){
    var update = function(){
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
    };
    Files.find({updateFile: currentFilename}).exec(function(err,databack){
      if(err){
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }else if(!databack.length){
        update();
      }else if(databack.length){
        var dataInDb = JSON.parse(JSON.stringify(databack[0]));
        var dataUpdate = JSON.parse(JSON.stringify(readyFile));
        if(dataInDb._id === dataUpdate._id){
          update();
        }
      }else{
        res.json({ message: currentFilename+' is existed!!!' });
      }
    });
  }
};

// file delete
exports.delete = function(req,res){
  var file = req.file;
  if(index.dbMode === 'json-server'){
    index.operations(req.path,req.method,'',function(data,code){
      if(code === 200)
        fileLoad.removefile(file.updateFile,function(back){
          res.json(back);
        });
    });
  }else if(index.dbMode === 'mnongo'){
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
  }
};

exports.fileById = function(req,res,next,id){
  if(index.dbMode === 'json-server'){
    index.operations(req.path,'','',function(data,code){
      if(code === 404){
        return next(new Error('Failed to load the file'));
      }
      req.file = JSON.parse(data);
      next();
    });
  }else if(index.dbMode === 'mongo'){
    Files.findById(id).exec(function(err,file){
      if(err){
        return next(err);
      }
      if(!file){
        return next(new Error('Failed to load the file '+id));
      }
      req.file = file;
      next();
    });
  }
};
