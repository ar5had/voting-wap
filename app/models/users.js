'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
	question   : String,
	options    : Array,
	createdAt  : String
});

var User = new Schema({
	name       : String,
	dp         : String,
	polls      : [pollSchema],
	pollsVoted : Number,
	github   : {
		id          : String,
		username    : String,
    	publicRepos : Number
	},
	google   : {
		id    : String,
		token : String,
    	email : String
	},
	twitter  : {
		id       : String,
		token    : String,
    	username : String
	},
	facebook : {
		id    : String,
		token : String,
    	email : String
	}
});

module.exports = mongoose.model('User', User);
