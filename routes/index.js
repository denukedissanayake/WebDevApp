const express = require('express')
const router = express.Router()
const Book = require('../models/book')

const { setPermissions, checkAuthenticated } = require('../permission')

router.get('/', async (req, res) => {

    let books = []

    try {
        books = await Book.find().sort({createdAt: 'desc'}).limit(10).exec()
    } catch {
        books = []
    }
    res.render('index', {
        books: books,
        canEdit: setPermissions(req,res)
    })
})

module.exports = router 