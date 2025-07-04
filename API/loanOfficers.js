const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new loan officer
router.post('/post', async (req, res) => {
  const { FirstName, LastName, PhoneNumber, Email, OfficeLocation, PerformanceRating, TotalLoansManaged } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO LoanOfficers (FirstName, LastName, PhoneNumber, Email, OfficeLocation, PerformanceRating, TotalLoansManaged)
      VALUES (${FirstName}, ${LastName}, ${PhoneNumber}, ${Email}, ${OfficeLocation}, ${PerformanceRating}, ${TotalLoansManaged})`;

    res.status(201).json({ message: 'Loan Officer added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing loan officer
router.put('/update/:id', async (req, res) => {
  const loanOfficerID = req.params.id;
  const { FirstName, LastName, PhoneNumber, Email, OfficeLocation, PerformanceRating, TotalLoansManaged } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE LoanOfficers
      SET FirstName = ${FirstName}, LastName = ${LastName}, PhoneNumber = ${PhoneNumber}, Email = ${Email},
          OfficeLocation = ${OfficeLocation}, PerformanceRating = ${PerformanceRating}, TotalLoansManaged = ${TotalLoansManaged}
      WHERE LoanOfficerID = ${loanOfficerID}`;

    res.status(200).json({ message: 'Loan Officer updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a loan officer
router.delete('/delete/:id', async (req, res) => {
  const loanOfficerID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM LoanOfficers WHERE LoanOfficerID = ${loanOfficerID}`;
    res.status(200).json({ message: 'Loan Officer deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all loan officers
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM LoanOfficers`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get loan officer by ID
router.get('/get/:id', async (req, res) => {
  const loanOfficerID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM LoanOfficers WHERE LoanOfficerID = ${loanOfficerID}`;
    const loanOfficer = result.recordset[0];

    if (loanOfficer) {
      res.status(200).json(loanOfficer);
    } else {
      res.status(404).json({ message: 'Loan Officer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
