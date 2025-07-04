const sql = require('mssql');
const config = require('./config');

const connectDB = async () => {
  try {
    // Establish the database connection
    await sql.connect(config);
    console.log('Connected to SQL Server successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Close the connection
const closeDB = async () => {
  await sql.close();
};

module.exports = { connectDB, closeDB };
