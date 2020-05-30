const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')


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

    req.body.birth = Date.parse(req.body.birth)
    req.body.id = Number(data.members.length  + 1)
    
    let { id, avatar_url, name, email, birth, gender, blood, weight, height } = req.body

    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar dados')

        return res.redirect('/members')
    })    
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id
    })

    if (!foundMember) {
        return res.send('Member não encontrado')
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
    }

    return res.render('members/edit', {member})
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundMember = data.members.find((member) => {
        return member.id == id 
    })

    if (!foundMember) return res.send('Instrutor não encontrado')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    }

    return res.render('members/show', { member })
    
}

exports.put = (req, res) => {
    const { id } = req.body 
    let index = 0

    const foundMember = data.members.find((member, foundIndex) => {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send('Member not found')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(foundMember.id)
    }

    data.members[index] = member

    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body 

    const filterMembers = data.members.filter((member) => {
        return id != member.id
    })

    data.members = filterMembers 

    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Falha ao salvar')

        return res.redirect(`/members/`)
    })
}
