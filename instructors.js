const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')


exports.index = (req, res) => {
    return res.render('instructors/index', {instructors: data.instructors})
}


exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id 
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        created_at: Intl.DateTimeFormat('pt-br').format(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor })
    
}


exports.edit = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send('Instructor não encontrado')
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        birth: date(foundInstructor.birth),
        created_at: Intl.DateTimeFormat('pt-br').format(foundInstructor.created_at),
    }

    return res.render('instructors/edit', {instructor})
}


exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] === "") {
            res.send('Preecha os todos os campos!')
        }
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length  + 1)
    req.body.services = req.body.services.split(",")
    
    let { id, avatar_url, name, birth, gender, services, created_at } = req.body

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar dados')

        return res.redirect('/instructors')
    })    
}


exports.put = (req, res) => {
    const { id } = req.body 
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        services: req.body.services.split(","),
        id: Number(foundInstructor.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar')

        return res.redirect(`/instructors/${id}`)
    })
}


exports.delete = (req, res) => {
    const { id } = req.body 

    const filterInstructors = data.instructors.filter((instructor) => {
        return id != instructor.id
    })

    data.instructors = filterInstructors 

    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar')

        return res.redirect(`/instructors/`)
    })
}
