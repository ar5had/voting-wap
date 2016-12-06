'use strict';

var Users       = require('../models/users.js');
var Polls       = require('../models/polls.js');
var randomColor = require("randomcolor");


function ClickHandler () {

	// this.getClicks = function (req, res) {
	// 	Users
	// 		.findOne({ 'github.id': req.user.github.id }, { '_id': false })
	// 		.exec(function (err, result) {
	// 			if (err) { throw err; }

	// 			res.json(result.nbrClicks);
	// 		});
	// };

	// this.addClick = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };

	// this.resetClicks = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };
	
	// this.getAllPolls = function (req, res, next) {
	// 	Users
	// 		.find({}, function(err, users) {
	// 			  if (err) {
	// 			  	console.error('Some Error happened while accessing all the polls!', err);
	// 			  	res.status(500).send({ 'error': 'Some Error happened while accessing all the polls!' });
	// 			  } else {
	// 			  	users.forEach(function(user) {
	// 			  		req.allPolls.push(user.polls)	
	// 			  	});
	// 				console.log(users);
	// 			  }
	// 			});
	// };
	
	this.removeProfile = function (req, res) {
		console.log(req.userID);
		Users
			 .findOneAndRemove({ '_id': req.userID }, function(err, doc) {
			 	if (err) {
			 		console.error('Error occured while removing profile', err);
        			res.status(500).send({ error: "Error occured while removing profile"});
			 	} else {
					console.log("Deleting profile:", doc);
					res.status(200).send();
				}
		 	 });
	};
	
	this.addPoll = function (req, res, next) {
		var question = req.body.question,
			options  = req.body.options;
		
		// removing trailing whitespaces in options
		options = options.split(",");
		options = options.map(function(option) {
			return option.replace(/^\s+|\s+$/g, "");
		});

		var poll                   = new Polls();
		poll.question              = question;
		poll.options               = options;
		poll.createdAt             = new Date().toDateString().slice(4);
		poll.views                 = 0;
		poll.votes                 = options.map(function(elem) {return 0;});
		poll.colors                = randomColor({luminosity: 'light',count: options.length});
        poll.author                = req.user._id;
		poll.save(function (err) {
			if (err) {
				console.error('Some error happened while Adding poll to polls collection');
				res.status(500).send({ 'error': 'Some error happened while Adding poll to polls collection' });
			}
			
			Users
				.findByIdAndUpdate(req.user._id, {$inc : {pollsCount : 1}})
				.exec(function (err, user) {
						if (err) { 
							console.error('Some error happened while Adding question to user\'s account');
							res.status(500).send({ 'error': 'Some error happened while Adding question to user\'s account' });
						} 
						else {
							console.log('Poll count increased and poll successfully added to polls collection!');
							next();
						}
				});
			
		});
	};
}

module.exports = ClickHandler;
