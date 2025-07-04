const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors')
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

const app = express();
const port = 5500;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

  app.use(bodyParser.json()); // Parse JSON request bodies
  app.use(bodyParser.urlencoded({ extended: true }));

// Clients Router definition
const clientsRouter = require('./clients'); // Assuming you have a 'clients.js' file for routes
const loanOfficerRouter = require('./loanOfficers')
const loanProductRouter = require('./loanProducts')
const loansRouter = require('./loans')
const collateralRouter = require('./collateral')
const transactionRouter = require('./transactions')
const delinquencyRouter = require('./delinquency')
const repaymentsRouter = require('./repayments')
const missedpaymentsRouter = require('./missedpayments')
const monthlyCalculationsRouter = require('./monthlyCalculations')

// Database connection function
const connectDB = async () => {
  try {
    // Try connecting to the database
    await sql.connect(config);
    console.log('Connected to SQL Server successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

app.use('/clients', clientsRouter);
app.use('/loan-officers', loanOfficerRouter)
app.use('/loan-products', loanProductRouter)
app.use('/loans', loansRouter)
app.use('/collaterals', collateralRouter)
app.use('/transactions', transactionRouter)
app.use('/delinquency', delinquencyRouter)
app.use('/repayments', repaymentsRouter)
app.use('/missed-payments', missedpaymentsRouter)
app.use('/monthly-calculations', monthlyCalculationsRouter)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDB(); // Automatically connect to the database when the server starts
});

process.on('SIGINT', async () => {
  try {
    await sql.close(); // Close the connection when the app is terminated
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error.message);
  }
  process.exit();
});
