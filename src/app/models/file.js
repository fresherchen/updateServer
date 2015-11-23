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
		type: String,
	},
	versionEnd: {
		type: String
	},
	deltaFile: {
		type: String,
		required: true
	},
	updatedOn: {
		type: Date,
		default: Date.now()
	}
});
mongoose.model('Files',FileSchema);
