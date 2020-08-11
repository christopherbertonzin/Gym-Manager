const Member = require('../models/members')
const { age, date } = require ('../../lib/utils')

module.exports = {
    index(req, res) {

        Member.all(function(members){
            return res.render('members/index', {members})
        })

    },
    create(req, res) {

        Member.instructorSelectOptions(function (options) {
            return res.render('members/create', { instructorSelectOptions: options})
        })
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] === "") {
                res.send('Preecha os todos os campos!')
            }
        }
        
        Member.create(req.body, function(members){
            return res.redirect(`members/${members.id}`)
        })

    },
    show(req, res) {

        Member.find(req.params.id, function(member) {
            if (!member) return res.send('member not found')

            member.birth = date(member.birth).birthDay
            
            return res.render('members/show', { member })
        })
        
    },
    edit(req, res) {

        Member.find(req.params.id, function(member) {
            if (!member) return res.send('member not found')

            member.birth = date(member.birth).iso
            
            Member.instructorSelectOptions(function (options) {
                return res.render('members/edit', { member, instructorSelectOptions: options})
            })
            
        })
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] === "") {
                res.send('Preecha os todos os campos!')
            }
        }
        
        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {

        Member.delete(req.body.id, function(){
            return res.redirect('members/')
        })
    }
}
