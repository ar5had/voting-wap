module.exports = function(app, isLoggedIn, clickHandler) {
    app.route('/my-polls')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/myPolls", {
				pageTitle : "My Polls",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && req.user.name.toString()) || "",
				polls: req.myPolls
			});
			delete req.myPolls;
		});
};