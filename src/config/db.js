const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'cisco',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})