require("dotenv").config();
const mysql = require("mysql");
// const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionTimeout: 5000,
  connectionLimit: 30
});

module.exports = db;
