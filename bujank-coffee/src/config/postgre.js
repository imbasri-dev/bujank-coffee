const { Pool } = require("pg");

const db = new Pool({
    host: "localhost",
    user: "imbasri",
    database: "bujank_coffee",
    password: "rooted",
    port: 5432,
});

module.exports = db;
