const dbConnection = require('./config/db');

const testConnection = async () => {
  try {
    const connection = await dbConnection();
    console.log('Connected to the database successfully!');
    connection.end();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

testConnection();
