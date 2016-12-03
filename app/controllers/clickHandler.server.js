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
			 	delete req.userID;
			 	if (err) throw err;
			 	console.log("Deleting profile:", doc);
			 	next();
			 });
	};

}

module.exports = ClickHandler;
