const dotEnv = require('dotenv');

dotEnv.config();

const config = {
    port: process.env.MYSQL_ADDON_PORT || 8080,
    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    user: process.env.MYSQL_ADDON_USER || 'root',
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
}

module.exports = config;