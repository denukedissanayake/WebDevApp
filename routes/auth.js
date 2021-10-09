const express = require('express')
const router = express.Router()

const passport = require('passport')
const initializePassport = require('../passport-config')
const bcrypt = require('bcrypt')


initializePassport(
    passport,
    email => Users.find(user => user.email === email),
    id => Users.find(user => user.id === id),
)

const Users = []


router.get('/', checkAuthenticated, (req, res) => {
    res.render('auth/index.ejs', {
        name: req.user.name
    })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('auth/login.ejs')
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('auth/register.ejs')
})


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/auth',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.post('/register', checkNotAuthenticated, async (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        Users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/auth/login')
    } catch {
        console.log("Users")
        res.redirect('/auth/register')
    }
    console.log(Users)
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
})


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


module.exports = router