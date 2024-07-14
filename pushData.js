require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Ensure the connection string is read correctly
const connectionString = process.env.POSTGRES_URL;
console.log('Connection string:', connectionString);
if (!connectionString) {
  console.error('Connection string not found. Make sure POSTGRES_URL is set in the environment variables.');
  process.exit(1);
}

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function pushData() {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'project.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');

    // Split the SQL commands by semicolon if needed
    const commands = sql.split(';').filter(cmd => cmd.trim() !== '');

    // Execute each command
    for (const command of commands) {
      const res = await client.query(command);
      console.log('Command executed:', res);
    }
  } catch (err) {
    console.error('Error executing SQL commands:', err);
  } finally {
    await client.end();
  }
}

pushData();
