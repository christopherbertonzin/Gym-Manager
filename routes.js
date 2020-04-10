const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (req, res) => { 
    res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    res.render('instructors/index')
})

routes.get('/members', (req, res) => {
    res.render('members')
})

routes.get('/instructors/create', (req, res) => {
    res.render('instructors/create')
})

routes.post('/instructors', instructors.post)

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

module.exports = routes