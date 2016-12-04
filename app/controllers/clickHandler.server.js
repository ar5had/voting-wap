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
	
	this.removeProfile = function (req, res, next) {
		console.log(req.userID);
		Users
			 .findOneAndRemove({ '_id': req.userID }, function(err, doc) {
			 	if (err) {
			 		console.error('Error occured while removing profile', err);
        			res.status(500).send({ error: "Something went wrong!"});
			 	};
			 	console.log("Deleting profile:", doc);
			 	req.method = 'GET';
			 	res.redirect("/");
			 });
	};

}

module.exports = ClickHandler;
