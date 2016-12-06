module.exports = function(app, isLoggedIn) {
    app.route('/polls/:id')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/poll", {
				pageTitle : "Poll",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
};