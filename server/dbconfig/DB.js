module.exports = {
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DB || 'AGEG',
    password: process.env.PG_PW || 'password',
    port: process.env.PG_PORT || 5432
}
