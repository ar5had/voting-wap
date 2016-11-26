'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id          : String,
		name        : String,
		username    : String,
    publicRepos : Number,
    dp          : String
	},
	google: {
		id    : String,
		name  : String,
		token : String,
    email : String,
    dp    : String
	},
	twitter: {
		id       : String,
		name     : String,
		token    : String,
    username : String,
    dp       : String
	},
	facebook: {
		id    : String,
		name  : String,
		token : String,
    email : String,
    dp    : String
	},
    nbrClicks: {
      clicks: Number
    }
});

module.exports = mongoose.model('User', User);
