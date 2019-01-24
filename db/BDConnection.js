const db = require('../config/DB');
const { Pool } = require('pg');

const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
});

module.exports = pool;