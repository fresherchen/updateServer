'use strict';
/**
 * Module dependencies. 
 */
var mongoose = require('mongoose'),
	Files = mongoose.model('Files'),
	errorHandler = require('./errors'),
	fileUpDown = require('./file-updown'),
	_ = require('lodash');

// file create
exports.create = function(req,res){
	var file = req.files.file,
		filename = file.originalFilename,
		retVal = fileUpDown.parseFilename(filename);
	
	var readyFile = new Files(retVal);
	Files.find({deltaFile: readyFile.deltaFile}).exec(function(err,databack){
		if(!databack.length){
			readyFile.save(function(err){
				if(err){
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					})
				}else{
					res.json(readyFile);
				}
			});
		}else{
			res.json({result:'this .sh has existed !!!'});
		}
	});
};

// file read
exports.read = function(req,res){
	res.json(req.file);
};

// file list
exports.list = function(req,res){
	var searchCon = {};
	if(req.query){
		if(req.query.image){
			searchCon.image = req.query.image;
		}else return;

		if(req.query.buildStart || req.query.buildEnd || (req.query.buildStart<req.query.buildEnd)){
			searchCon.buildEnd = {$gt:req.query.buildStart,$lte:req.query.buildEnd};
		}else return;
		if(req.query.deltaFile){
			searchCon.deltaFile = req.query.deltaFile;
		}
	}
	
	Files.find(searchCon).sort({ buildEnd: 1 }).exec(function(err,files){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			})
		}else{
			res.json(files);
		}
	});
};

// file update image/deltaFile
exports.update = function(req,res){
	
	var file = req.file,
		originalFilename = req.file.deltaFile,
		currentFilename = req.body.deltaFile,
		retVal = fileUpDown.parseFilename(currentFilename);
	
	var readyFile  = _.extend(file, retVal);
	readyFile.save(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
			fileUpDown.renamefile(originalFilename, currentFilename,function(path){
				res.json(path);
			});
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
			})
		}else{
			fileUpDown.removefile(file.deltaFile,function(back){
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
		if(!file) return next('Failed to load the file');
		req.file = file;
		next();
	});
};
