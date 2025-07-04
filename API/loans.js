const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

const router = express.Router();

// Add a new loan
router.post('/post', async (req, res) => {
  const {
    ClientID, LoanProductID, LoanAmount, InterestRate, StartDate, EndDate, LoanTerm,
    LoanStatus, LoanOfficerID
  } = req.body;

  console.log('Received request to add a new loan with the following details:');
  console.log(`ClientID: ${ClientID}, LoanProductID: ${LoanProductID}, LoanAmount: ${LoanAmount}`);
  console.log(`InterestRate: ${InterestRate}, StartDate: ${StartDate}, EndDate: ${EndDate}`);
  console.log(`LoanTerm: ${LoanTerm}, LoanStatus: ${LoanStatus}, LoanOfficerID: ${LoanOfficerID}`);

  try {
    // Validate required fields
    if (!ClientID || !LoanProductID || !LoanAmount || !InterestRate || !StartDate || !LoanTerm || !LoanStatus) {
      const missingFields = [];
      if (!ClientID) missingFields.push('ClientID');
      if (!LoanProductID) missingFields.push('LoanProductID');
      if (!LoanAmount) missingFields.push('LoanAmount');
      if (!InterestRate) missingFields.push('InterestRate');
      if (!StartDate) missingFields.push('StartDate');
      if (!LoanTerm) missingFields.push('LoanTerm');
      if (!LoanStatus) missingFields.push('LoanStatus');

      console.warn('Missing required fields:', missingFields);
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields
      });
    }

    // Establish a connection pool
    console.log('Connecting to SQL server...');
    const pool = await sql.connect(config);

    console.log('Connected to SQL server. Executing stored procedure...');
    // Use the connection pool to create a request
    const result = await pool.request()
      .input('ClientID', sql.Int, ClientID)
      .input('LoanProductID', sql.Int, LoanProductID)
      .input('LoanAmount', sql.Decimal(12, 2), LoanAmount)
      .input('InterestRate', sql.Decimal(5, 2), InterestRate)
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .input('LoanTerm', sql.Int, LoanTerm)
      .input('LoanStatus', sql.NVarChar(20), LoanStatus)
      .input('LoanOfficerID', sql.Int, LoanOfficerID)
      .execute('AddNewLoanRecord'); // Name of the stored procedure

    console.log('Stored procedure executed successfully:', result.recordset);

    res.status(201).json({
      message: 'Loan added successfully',
      result: result.recordset
    });
  } catch (error) {
    console.error('SQL Error:', error); // Log SQL error to console
    res.status(500).json({
      message: 'Error adding loan',
      error: error.message,
      stack: error.stack // Include stack trace for debugging
    });
  }
});




// Update an existing loan
router.put('/update/:id', async (req, res) => {
  const loanID = req.params.id;
  const {
    ClientID, LoanProductID, LoanAmount, InterestRate, StartDate, EndDate, LoanTerm, 
    LoanStatus, LoanOfficerID
  } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Loans
      SET ClientID = ${ClientID}, LoanProductID = ${LoanProductID}, LoanAmount = ${LoanAmount}, InterestRate = ${InterestRate},
          StartDate = ${StartDate}, EndDate = ${EndDate}, LoanTerm = ${LoanTerm}, LoanStatus = ${LoanStatus},
          LoanOfficerID = ${LoanOfficerID}, RemainingTenure = ${RemainingTenure}, RemainingBalance = ${RemainingBalance},
          AmountPaid = ${AmountPaid}, MissedPayments = ${MissedPayments}, FixedMonthlyPayment = ${FixedMonthlyPayment}, NextInterest = ${NextInterest}
      WHERE LoanID = ${loanID}`;

    res.status(200).json({ message: 'Loan updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan', error: error.message });
  }
});

// Delete a loan
router.delete('/delete/:id', async (req, res) => {
  const loanID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Loans WHERE LoanID = ${loanID}`;
    res.status(200).json({ message: 'Loan deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error: error.message });
  }
});

// Get all loans
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Loans`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
});

// Get loan by ID
router.get('/get/:id', async (req, res) => {
  const loanID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Loans WHERE LoanID = ${loanID}`;
    const loan = result.recordset[0];

    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan', error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
