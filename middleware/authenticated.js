function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login?error=You must log in first');
    }
}

module.exports = isAuthenticated;
