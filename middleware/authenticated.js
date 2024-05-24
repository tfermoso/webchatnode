function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login?error=You must log in first');
    }
}

module.exports = isAuthenticated;
