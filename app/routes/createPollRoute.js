module.exports = function (app, isLoggedIn, clickHandler) {

    app.route('/create-poll')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/createPoll", {
				pageTitle : "Create new poll",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		})
		.post(isLoggedIn, clickHandler.addPoll, function(req, res) {
			res.redirect("/");
		});
};