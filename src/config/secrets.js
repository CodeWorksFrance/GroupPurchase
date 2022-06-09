const {Pool} = require("pg");
const dbConnection = new Pool({
    user: 'grouppurchaseadmin',
    host: 'localhost',
    database: 'grouppurchase',
    password: 'butterfly',
    port: 5432,
});

module.exports = dbConnection;
