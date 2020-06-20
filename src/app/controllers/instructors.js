const { age, date } = require('../../lib/utils')


exports.index = (req, res) => {
    return res.render('instructors/index', {instructors: data.instructors})
}


exports.show = (req, res) => {
    
}


exports.edit = (req, res) => {
  
}


exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] === "") {
            res.send('Preecha os todos os campos!')
        }
    }
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
