const { age, date } = require('../../lib/utils')
const db = require('../../config/db.js')
const { query } = require('../../config/db.js')

module.exports = {
    all(calback){
        const query = `
            SELECT * 
            FROM members 
            ORDER BY name ASC `

        db.query(query, (err, results) => {
            if (err) throw `Database Error: ${err}`
            
            calback(results.rows)
        })
    },
    create(data, calback){
        const query = `
            INSERT INTO members (
                avatar_url,
                name,
                gender,
                birth,
                blood,
                weight,
                height,
                email,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.email,
            data.instructor_id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database Error: ${err}`
            
            calback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT members.*, instructors.name as instructor_name
            FROM members
            LEFT JOIN instructors ON (members.instructor_id = instructors.id) 
            WHERE members.id = $1`, [id], function(err, results) {
            if (err) throw `Database Error: ${err}`

            callback(results.rows[0])
        }) 
    },
    update(data, callback){
        const query = `
            UPDATE members SET
                name=($1),
                avatar_url=($2),
                gender=($3),
                birth=($4),
                blood=($5),
                weight=($6),
                height=($7),
                email=($8),
                instructor_id=($9)
            WHERE id = $10
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.email,
            data.instructor_id,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error: ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query('DELETE FROM members WHERE id = $1', [id], function(err, results){
            if (err) throw `Database Error: ${err}`

            callback()
        })
    },
    instructorSelectOptions(callback){
        db.query('SELECT name, id FROM instructors', (err, results) => {
            if (err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    } 
}