const dotenv = require(`dotenv`);
dotenv.config();

const baseURL = `https://gorest.co.in/`;
const token = process.env.API_TOKEN_GOREST;
const contentType = `application/json`;

module.exports = {
    baseURL,
    token,
    contentType};