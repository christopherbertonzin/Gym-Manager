const instructor = require('../models/instructors')
const { age, date } = require ('../../lib/utils')

module.exports = {
    index(req, res) {

        const { filter } = req.query

        if (filter) {

            instructor.filterByName(filter, function(instructors) {
                for (let instructor of instructors) {
                    instructor.services = instructor.services.split(",")
                }
                return res.render('instructors/index', {instructors})
            })
        } else {
            
            instructor.all(function(instructors){
                for (let instructor of instructors) {
                    instructor.services = instructor.services.split(",")
                }
                return res.render('instructors/index', {instructors})
            })
        }

    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] === "") {
                res.send('Preecha os todos os campos!')
            }
        }
        
        instructor.create(req.body, function(instructors){
            return res.redirect(`/instructors/${instructors.id}`)
        })  

    },
    show(req, res) {
        const id = req.params.id

        if (!id) {
            res.render(`Error id: ${id}`)
        }
        
        instructor.find(id, function(instructor) {
            if (!instructor) return res.send('Instructor not found')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            
            return res.render('instructors/show', { instructor })
        })
        
    },
    edit(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send('Instructor not found')

            instructor.birth = date(instructor.birth).iso
            
            return res.render('instructors/edit', { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] === "") {
                res.send('Preecha os todos os campos!')
            }
        }
        
        instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        instructor.delete(req.body.id, function(){
            return res.redirect('/')
        })
    }
}
