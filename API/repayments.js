const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new repayment
router.post('/post', async (req, res) => {
  const { LoanID, PaymentDate, PaymentAmount, PaymentMethod, RemainingBalance, DelinquencyDays, PrincipalPaid, InterestPaid } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Repayments (LoanID, PaymentDate, PaymentAmount, PaymentMethod, RemainingBalance, DelinquencyDays, PrincipalPaid, InterestPaid)
      VALUES (${LoanID}, ${PaymentDate}, ${PaymentAmount}, ${PaymentMethod}, ${RemainingBalance}, ${DelinquencyDays}, ${PrincipalPaid}, ${InterestPaid})`;

    res.status(201).json({ message: 'Repayment added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing repayment
router.put('/update/:id', async (req, res) => {
  const repaymentID = req.params.id;
  const { LoanID, PaymentDate, PaymentAmount, PaymentMethod, RemainingBalance, DelinquencyDays, PrincipalPaid, InterestPaid } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Repayments
      SET LoanID = ${LoanID}, PaymentDate = ${PaymentDate}, PaymentAmount = ${PaymentAmount}, PaymentMethod = ${PaymentMethod}, 
          RemainingBalance = ${RemainingBalance}, DelinquencyDays = ${DelinquencyDays}, PrincipalPaid = ${PrincipalPaid}, 
          InterestPaid = ${InterestPaid}
      WHERE RepaymentID = ${repaymentID}`;

    res.status(200).json({ message: 'Repayment updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a repayment
router.delete('/delete/:id', async (req, res) => {
  const repaymentID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Repayments WHERE RepaymentID = ${repaymentID}`;
    res.status(200).json({ message: 'Repayment deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all repayments
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Repayments`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get repayment by ID
router.get('/get/:id', async (req, res) => {
  const repaymentID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Repayments WHERE RepaymentID = ${repaymentID}`;
    const repayment = result.recordset[0];

    if (repayment) {
      res.status(200).json(repayment);
    } else {
      res.status(404).json({ message: 'Repayment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
