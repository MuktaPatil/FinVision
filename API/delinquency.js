const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new delinquency
router.post('/post', async (req, res) => {
  const { LoanID, DelinquencyStartDate, DaysOverdue, CurrentStatus, AmountOverdue } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Delinquency (LoanID, DelinquencyStartDate, DaysOverdue, CurrentStatus, AmountOverdue, MissedPayment)
      VALUES (${LoanID}, ${DelinquencyStartDate}, ${DaysOverdue}, ${CurrentStatus}, ${AmountOverdue}, ${MissedPayment})`;

    res.status(201).json({ message: 'Delinquency added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing delinquency
router.put('/update/:id', async (req, res) => {
  const delinquencyID = req.params.id;
  const { LoanID, DelinquencyStartDate, DaysOverdue, CurrentStatus, AmountOverdue, MissedPayment } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Delinquency
      SET LoanID = ${LoanID}, DelinquencyStartDate = ${DelinquencyStartDate}, DaysOverdue = ${DaysOverdue},
          CurrentStatus = ${CurrentStatus}, AmountOverdue = ${AmountOverdue}, MissedPayment = ${MissedPayment}
      WHERE DelinquencyID = ${delinquencyID}`;

    res.status(200).json({ message: 'Delinquency updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a delinquency
router.delete('/delete/:id', async (req, res) => {
  const delinquencyID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Delinquency WHERE DelinquencyID = ${delinquencyID}`;
    res.status(200).json({ message: 'Delinquency deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all delinquencies
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Delinquency`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get delinquency by ID
router.get('/get/:id', async (req, res) => {
  const delinquencyID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Delinquency WHERE DelinquencyID = ${delinquencyID}`;
    const delinquency = result.recordset[0];

    if (delinquency) {
      res.status(200).json(delinquency);
    } else {
      res.status(404).json({ message: 'Delinquency not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
