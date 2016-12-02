'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.set("view engine", "ejs");

	app.route('/')
		.get(function (req, res) {
			res.render("./pages/index", {
				pageTitle : "Home",
				userLoggedIn: req.isAuthenticated()
			});
		});

	app.route('/login')
		.get(function (req, res) {
			res.render("./pages/login", {
				pageTitle : "Login",
				userLoggedIn: req.isAuthenticated()
			});
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/profile", {
				pageTitle : "Profile",
				userLoggedIn: req.isAuthenticated()
			});
		});
		
	app.route('/poll')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/poll", {
				pageTitle : "Poll",
				userLoggedIn: req.isAuthenticated()
			});
		});
	
	app.route('/credits')
		.get(function (req, res) {
			res.render("./pages/credits", {
				pageTitle : "Credits",
				userLoggedIn: req.isAuthenticated()
			});
		});
	
	app.route('/create-poll')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/createPoll", {
				pageTitle : "Create new poll",
				userLoggedIn: req.isAuthenticated()
			});
		});

	
	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
	// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));
        
    // route for twitter authentication and login    
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));
	
	// route for google authentication and login        
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.get("/*", function(req, res) {
		res.render("./pages/error", { 
			pageTitle: "404 - Page Not Found"
		});	
	});
	
};
