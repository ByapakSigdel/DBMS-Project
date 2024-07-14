require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFilePath = path.join(__dirname, 'project.sql');
const sqlQueries = fs.readFileSync(sqlFilePath, 'utf8');

// Database connection details
const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runSQL() {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Execute the SQL queries
    const res = await client.query(sqlQueries);
    console.log('SQL queries executed successfully:', res);

  } catch (err) {
    console.error('Error executing SQL queries:', err);
  } finally {
    await client.end();
  }
}

runSQL();
