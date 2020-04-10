const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructor = data.instructors.find((instructor) => {
        return instructor.id == id 
    })

    if (!foundInstructor) return res.send('Instrutor não encontrado')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
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
        services: foundInstructor.services.split(','),
        created_at: Intl.DateTimeFormat('pt-br').format(foundInstructor.created_at)
    }

    return res.render('instructors/edit', {instructor})
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    // VALIDAÇÂO

    for (let key of keys) {
        if (req.body[key] === "") {
            res.send('Preecha os todos os campos!')
        }
    }

    // SALVANDO EM JSON

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length  + 1)
    
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

        return res.redirect('http://localhost:3000/instructors')
    })
    
}
