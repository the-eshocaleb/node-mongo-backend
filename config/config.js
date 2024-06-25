const { config } = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'dev';
const envPath = path.resolve(__dirname, `${env.trim()}.env`);

config({
    path: envPath
});


module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}
