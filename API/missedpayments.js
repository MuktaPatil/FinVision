const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new missed payment
router.post('/post', async (req, res) => {
  const { LoanID, MissedPaymentDate, PaymentAmount } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO MissedPayments (LoanID, MissedPaymentDate, PaymentAmount, Penalty)
      VALUES (${LoanID}, ${MissedPaymentDate}, ${PaymentAmount}, ${Penalty})`;

    res.status(201).json({ message: 'Missed payment added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing missed payment
router.put('/update/:id', async (req, res) => {
  const missedPaymentID = req.params.id;
  const { LoanID, MissedPaymentDate, PaymentAmount } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE MissedPayments
      SET LoanID = ${LoanID}, MissedPaymentDate = ${MissedPaymentDate}, PaymentAmount = ${PaymentAmount}, Penalty = ${Penalty}
      WHERE MissedPaymentID = ${missedPaymentID}`;

    res.status(200).json({ message: 'Missed payment updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a missed payment
router.delete('/delete/:id', async (req, res) => {
  const missedPaymentID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM MissedPayments WHERE MissedPaymentID = ${missedPaymentID}`;
    res.status(200).json({ message: 'Missed payment deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all missed payments
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM MissedPayments`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get missed payment by ID
router.get('/get/:id', async (req, res) => {
  const missedPaymentID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM MissedPayments WHERE MissedPaymentID = ${missedPaymentID}`;
    const missedPayment = result.recordset[0];

    if (missedPayment) {
      res.status(200).json(missedPayment);
    } else {
      res.status(404).json({ message: 'Missed payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
