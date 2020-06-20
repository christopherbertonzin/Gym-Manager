const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../../lib/utils')


exports.index = (req, res) => {
    return res.render('members/index', {members: data.members})
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] === "") {
            res.send('Preecha os todos os campos!')
        }
    }    
}

exports.edit = (req, res) => {
}

exports.show = (req, res) => {

}

exports.put = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] === "") {
            res.send('Preecha os todos os campos!')
        }
    }  
}

exports.delete = (req, res) => {

}
