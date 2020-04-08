const fs = require('fs')
const data = require('./data.json')

// POST

exports.post = function(req, res) {
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
    
    let { id, avart_url, name, birth, gender, services, created_at } = req.body

    data.instructors.push({
        id,
        avart_url,
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
