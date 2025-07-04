const sql = require('mssql');

const config = {
  user: 'sa', // SQL Server username
  password: 'SU2orange!', // SQL Server password
  server: 'localhost', // SQL Server host (for local DB, use 'localhost')
  database: 'FinVIsion', // The name of the database you're connecting to
  options: {
    encrypt: true, // Use encryption if needed
    trustServerCertificate: true, // Required for local development if using self-signed certificates
  }
};

module.exports = config;
