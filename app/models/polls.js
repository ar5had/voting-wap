'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var encrypt   = require("../utilities/encrypt.js");

var PollSchema = new Schema({
	question   : String,
	options    : Array,
	createdAt  : String,
	views      : Number,
	votes      : Array, 
	colors     : Array,
	author     : String,
	authorId   : mongoose.Schema.Types.ObjectId,
	secret     : String
});

PollSchema.pre('save', function(next){
    this.secret = encrypt(new Date().getTime());
    next();
});

module.exports = mongoose.model('Poll', PollSchema);
