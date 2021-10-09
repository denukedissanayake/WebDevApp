function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/auth')
    }
    next()
}

function setPermissions(req, res, next) {
    if (req.isAuthenticated()) {
        return true
    } else {
        return false
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    setPermissions
}