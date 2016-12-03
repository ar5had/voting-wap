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
		var userId = req.user._id;
		req.logout();
		console.log(userId);
		Users
			 .findOneAndRemove({ '_id': userId }, function(err, doc) {
			 	if (err) throw err;
			 	console.log("Deleting profile:", doc);
			 	next();
			 });
	};

}

module.exports = ClickHandler;
