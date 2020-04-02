const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('layout')
})

routes.get('/instructors', (req, res) => res.render('instructors'))
routes.get('/members', (req, res) => res.render('members'))

module.exports = routes