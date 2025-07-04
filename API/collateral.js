const express = require('express');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new collateral
router.post('/post', async (req, res) => {
  const { LoanID, CollateralType, CollateralValue, CollateralDescription, CollateralStatus } = req.body;

  // Log the incoming request body for debugging
  console.log('Incoming request body:', req.body);

  // Validate required fields
  if (!LoanID || !CollateralType || !CollateralValue || !CollateralStatus) {
    console.error('Validation error: Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Connect to the database
    console.log('Connecting to the database...');
    await sql.connect(config);

    // Log query execution
    console.log('Executing query to insert new collateral...');
    const result = await sql.query`
      INSERT INTO Collateral (LoanID, CollateralType, CollateralValue, CollateralDescription, CollateralStatus)
      VALUES (${LoanID}, ${CollateralType}, ${CollateralValue}, ${CollateralDescription}, ${CollateralStatus})`;

    // Log query result
    console.log('Query executed successfully:', result);
    res.status(201).json({ message: 'Collateral added successfully', result });
  } catch (error) {
    // Log error details
    console.error('Error occurred while adding collateral:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing collateral
router.put('/update/:id', async (req, res) => {
  const collateralID = req.params.id;
  const { LoanID, CollateralType, CollateralValue, CollateralDescription, CollateralStatus } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Collateral
      SET LoanID = ${LoanID}, CollateralType = ${CollateralType}, CollateralValue = ${CollateralValue},
          CollateralDescription = ${CollateralDescription}, CollateralStatus = ${CollateralStatus}
      WHERE CollateralID = ${collateralID}`;

    res.status(200).json({ message: 'Collateral updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a collateral
router.delete('/delete/:id', async (req, res) => {
  const collateralID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Collateral WHERE CollateralID = ${collateralID}`;
    res.status(200).json({ message: 'Collateral deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all collateral
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Collateral`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get collateral by ID
router.get('/get/:id', async (req, res) => {
  const collateralID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Collateral WHERE CollateralID = ${collateralID}`;
    const collateral = result.recordset[0];

    if (collateral) {
      res.status(200).json(collateral);
    } else {
      res.status(404).json({ message: 'Collateral not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
