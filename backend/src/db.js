const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "07072007",
  database: "smart_interview",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
