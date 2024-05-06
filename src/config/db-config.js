const { Pool } = require("pg");
require("dotenv").config();

// Retrieve PostgreSQL connection details from environment variables
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

// Create a connection pool
const pool = new Pool({
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
});

// Function to connect to PostgreSQL database
const connect = async () => {
  try {
    // Use pool.query for executing queries or use the pool directly in your application
    await pool.connect();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    // You might want to handle errors here, such as throwing an error or exiting the application
  }
};

module.exports = connect;
