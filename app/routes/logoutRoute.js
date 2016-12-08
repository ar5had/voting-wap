module.exports = function(app) {
    app.route('/logout')
    		.post(function (req, res) {
    			req.logout();
    			res.redirect('/');
    			console.log(req.session.returnTo);
    			
    			if (req.session.returnTo)
    			    delete req.session.returnTo;
    		});
};