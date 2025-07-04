const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config'); // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new loan product
router.post('/post', async (req, res) => {
  const { ProductName, Description, MaxLoanAmount, InterestRate, LoanTerm, ProcessingFee } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO LoanProducts (ProductName, Description, MaxLoanAmount, InterestRate, LoanTerm, ProcessingFee)
      VALUES (${ProductName}, ${Description}, ${MaxLoanAmount}, ${InterestRate}, ${LoanTerm}, ${ProcessingFee})`;

    res.status(201).json({ message: 'Loan Product added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing loan product
router.put('/update/:id', async (req, res) => {
  const loanProductID = req.params.id;
  const { ProductName, Description, MaxLoanAmount, InterestRate, LoanTerm, ProcessingFee } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE LoanProducts
      SET ProductName = ${ProductName}, Description = ${Description}, MaxLoanAmount = ${MaxLoanAmount}, 
          InterestRate = ${InterestRate}, LoanTerm = ${LoanTerm}, ProcessingFee = ${ProcessingFee}
      WHERE LoanProductID = ${loanProductID}`;

    res.status(200).json({ message: 'Loan Product updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a loan product
router.delete('/delete/:id', async (req, res) => {
  const loanProductID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM LoanProducts WHERE LoanProductID = ${loanProductID}`;
    res.status(200).json({ message: 'Loan Product deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all loan products
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM LoanProducts`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get loan product by ID
router.get('/get/:id', async (req, res) => {
  const loanProductID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM LoanProducts WHERE LoanProductID = ${loanProductID}`;
    const loanProduct = result.recordset[0];

    if (loanProduct) {
      res.status(200).json(loanProduct);
    } else {
      res.status(404).json({ message: 'Loan Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router to use in index.js
module.exports = router;
