// transactions.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

router.post('/post', async (req, res) => {
  const { LoanID, TransactionDate, Amount, TransactionType, ClientID } = req.body;

  // Debugging: Log the received request body
  console.log(`Received request body: ${JSON.stringify(req.body)}`);

  try {
    // Debugging: Log when the connection to the database starts
    console.log('Connecting to the database...');
    const pool = await sql.connect(config);

    // Call the AddDisbursementTransaction stored procedure
    console.log('Calling AddDisbursementTransaction stored procedure...');
    const result = await pool.request()
      .input('LoanID', sql.Int, LoanID)
      .input('TransactionDate', sql.Date, TransactionDate)
      .input('Amount', sql.Decimal(18, 2), Amount)
      .input('TransactionType', sql.VarChar(50), TransactionType)
      .input('ClientID', sql.Int, ClientID)
      .execute('AddDisbursementTransaction'); // Call the stored procedure

    console.log('AddDisbursementTransaction stored procedure executed successfully.');

    // If rows are affected, return success response
    if (result.rowsAffected[0] > 0) {
      console.log('Transaction added successfully and Loan status updated to Active.');
      res.status(201).json({ message: 'Transaction added successfully and LoanStatus updated to Active.' });
    } else {
      console.log('No rows were affected.');
      res.status(400).json({ message: 'Transaction failed to add or update LoanStatus.' });
    }

  } catch (error) {
    console.error('Error during stored procedure execution:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing transaction
router.put('/update/:id', async (req, res) => {
  const transactionID = req.params.id;
  const { LoanID, TransactionDate, Amount, TransactionType, ClientID } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Transactions
      SET LoanID = ${LoanID}, TransactionDate = ${TransactionDate}, Amount = ${Amount}, TransactionType = ${TransactionType}, ClientID = ${ClientID}
      WHERE TransactionID = ${transactionID}`;

    res.status(200).json({ message: 'Transaction updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction
router.delete('/delete/:id', async (req, res) => {
  const transactionID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Transactions WHERE TransactionID = ${transactionID}`;
    res.status(200).json({ message: 'Transaction deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Transactions`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get('/get/:id', async (req, res) => {
  const transactionID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Transactions WHERE TransactionID = ${transactionID}`;
    const transaction = result.recordset[0];

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
