'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * File Schema
 */
var FileSchema = new Schema({
  image: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  buildStart: {
    type: Number,
    required: true
  },
  buildEnd: {
    type: Number,
    required: true
  },
  versionStart: {
    type: String
  },
  versionEnd: {
    type: String
  },
  updateFile: {
    type: String,
    trim: true,
    required: true
  },
  hostname: {
    type: String,
    required: true
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  }
});

// Define a virtual filePath
FileSchema.virtual('filePath').get(function(){
  // need parse something to gain the domain name
  return 'update.example.com/files/'+ this.updateFile +'/download?hostname='+ this.hostname;
});

mongoose.model('Files',FileSchema);
