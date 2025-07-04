const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Utility function to execute a stored procedure
const executeStoredProc = async (procName) => {
  try {
    const result = await sql.query`EXEC ${procName}`;
    return result;
  } catch (error) {
    throw new Error(`Error executing stored procedure ${procName}: ${error.message}`);
  }
};

// Execute all the stored procedures
router.post('/run-procedures', async (req, res) => {
  try {
    await sql.connect(config);

    // Call each stored procedure
    await executeStoredProc('MissedPaymentsCheck');
    await executeStoredProc('MonthlyLoanPaymentCheck');
    await executeStoredProc('DelinquencyCheck');
    await executeStoredProc('ProcessOverduePayments');
    await executeStoredProc('CalculateInterest');

    // If all stored procedures execute without error, send OK response
    res.status(200).json({ message: 'All stored procedures executed successfully' });
  } catch (error) {
    // Catch and handle errors
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
