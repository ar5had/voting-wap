'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			req.session.returnTo = req.path;
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.set("view engine", "ejs");

	app.route('/')
		.get(function (req, res) {
			res.render("./pages/index", {
				pageTitle : "Home",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "" 
			});
		});

	app.route('/login')
		.get(function (req, res) {
			res.render("./pages/login", {
				pageTitle : "Login",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});

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
		// isLoggedIn
		// saveID of user
		// logout
		// remove user from db
		// redirect to homepage (clickController.client.profile.js)
		.delete(isLoggedIn, function (req, res, next) {
			req.userID = req.user._id;
			req.logout();
			next();
		}, clickHandler.removeProfile);
		
	app.route('/my-polls')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/myPolls", {
				pageTitle : "My Polls",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
		
	app.route('/polls/:id')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/poll", {
				pageTitle : "Poll",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
	
	app.route('/credits')
		.get(function (req, res) {
			res.render("./pages/credits", {
				pageTitle : "Credits",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
	
	app.route('/create-poll')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/createPoll", {
				pageTitle : "Create new poll",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
	
	app.route('/logout')
		.post(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			failureRedirect: '/login'
		}), 
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
        });
		
	// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect : '/login'
        }), 
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
        });
        
    // route for twitter authentication and login    
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            failureRedirect : '/login'
        }), 
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
        });
	
	// route for google authentication and login        
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/login'
            }), 
            function(req, res) {
            	res.redirect(req.session.returnTo || "/");
            	delete req.session.returnTo;
            });

	//app.route('/api/:id/clicks')
	// 	.get(isLoggedIn, clickHandler.getClicks)
	// 	.post(isLoggedIn, clickHandler.addClick)
	// 	.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.get("/*", function(req, res) {
		res.render("./pages/error", { 
			pageTitle: "404 - Page Not Found"
		});	
	});
	
	app.get("/tryGet", function(req, res) {
		res.status(200).json({"data":"data"})	
	});
	
};
