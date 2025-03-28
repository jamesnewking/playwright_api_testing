const dotenv = require(`dotenv`);
dotenv.config();

const baseURL = `https://gorest.co.in`;
const token = process.env.API_TOKEN_GOREST;
const contentType = `application/json`;
const loginEmail = "speeding.rocket@gmail.com";
const loginPassword  = process.env.CHIPOTLE_PASSWORD;

module.exports = {
    baseURL,
    token,
    contentType,
    loginEmail,
    loginPassword
};