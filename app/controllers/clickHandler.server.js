'use strict';

var Users = require('../models/users.js');

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
	
	this.removeProfile = function (req, res) {
		console.log(req.userID);
		Users
			 .findOneAndRemove({ '_id': req.userID }, function(err, doc) {
			 	if (err) {
			 		console.error('Error occured while removing profile', err);
        			res.status(500).send({ error: "Something went wrong!"});
			 	} else {
					console.log("Deleting profile:", doc);
					res.status(200).send();
				}
		 	 });
	};
	
	this.addPoll = function (req, res, next) {
		var question = req.body.question,
			options  = req.body.options,
			dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		
		// removing trailing whitespaces in options
		options = options.split(",");
		options = options.map(function(option) {
			return option.replace(/^\s+|\s+$/g, "");
		});
		
		Users
			.findById(req.user._id)
			.exec(function (err, user) {
					if (err) { 
						console.error("Some error happened while Adding question to user's account");
						res.status(500).send();
					} else {
						user.polls.push({
							question: question,
							options: options.split(","),
							addedAt: new Date().toLocaleDateString("en-US", dateOptions)
						});	
						user.save(function(err) {
						    if (err) {
						    	console.error("Some error happened while Saving question to user's account");
								res.status(500).send();
						    }
						    console.log("Question successfully added to user's account!");
						    console.log(question, options);
						    next();
						});
					}
				}
			);
	};
}

module.exports = ClickHandler;
