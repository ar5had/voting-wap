var Polls = require("../models/polls.js");

var getPoll = function(req, res, next) {
	Polls.
		find({'secret': req.params.id})
		.exec(function(err, poll) {
			if (err) {
				console.error('Some Error happened while finding the poll that is clicked!', err);
				res.status(500).send({ 'error': 'Some Error happened while finding the poll that is clicked!' });
			}
			else {
				req.pollRequested = poll[0];
				next();
			}
		});
};

module.exports = function(app, isLoggedIn) {
    app.route('/polls/:id')
		.get(isLoggedIn, getPoll, function (req, res) {
			res.render("./pages/poll", {
				pageTitle : req.pollRequested.question,
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "",
				poll: req.pollRequested
			});
			delete req.pollRequested;
		});
};