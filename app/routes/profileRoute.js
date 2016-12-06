module.exports = function (app, isLoggedIn, clickHandler) {
 
    app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/profile", {
				pageTitle : "Profile",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "",
				pollsCreated: req.user.polls.length, 
				pollsVoted: req.user.pollsVoted,
				img: req.user.dp
			});
		})
		.delete(isLoggedIn, function (req, res, next) {
			req.userID = req.user._id;
			req.logout();
			next();
		}, clickHandler.removeProfile);
};