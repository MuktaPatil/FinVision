// clients.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const config = require('./config') // Ensure config file exists and is correctly set up

// Express router
const router = express.Router();

// Add a new client
router.post('/post', async (req, res) => {
  const { FirstName, LastName, DateOfBirth, Gender, Address, City, State, Country, PhoneNumber, Email, IncomeLevel, ClientStatus } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      INSERT INTO Clients (FirstName, LastName, DateOfBirth, Gender, Address, City, State, Country, PhoneNumber, Email, IncomeLevel, ClientStatus)
      VALUES (${FirstName}, ${LastName}, ${DateOfBirth}, ${Gender}, ${Address}, ${City}, ${State}, ${Country}, ${PhoneNumber}, ${Email}, ${IncomeLevel}, ${ClientStatus})`;

    res.status(201).json({ message: 'Client added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing client
router.put('/update/:id', async (req, res) => {
  const clientID = req.params.id;
  const { FirstName, LastName, DateOfBirth, Gender, Address, City, State, Country, PhoneNumber, Email, IncomeLevel, ClientStatus } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      UPDATE Clients
      SET FirstName = ${FirstName}, LastName = ${LastName}, DateOfBirth = ${DateOfBirth}, Gender = ${Gender}, Address = ${Address},
          City = ${City}, State = ${State}, Country = ${Country}, PhoneNumber = ${PhoneNumber}, Email = ${Email},
          IncomeLevel = ${IncomeLevel}, ClientStatus = ${ClientStatus}
      WHERE ClientID = ${clientID}`;

    res.status(200).json({ message: 'Client updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a client
router.delete('/delete/:id', async (req, res) => {
  const clientID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Clients WHERE ClientID = ${clientID}`;
    res.status(200).json({ message: 'Client deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all clients
router.get('/get', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Clients`;
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client by ID
router.get('/get/:id', async (req, res) => {
  const clientID = req.params.id;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Clients WHERE ClientID = ${clientID}`;
    const client = result.recordset[0];
    
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // <-- Missing closing bracket was here

// Export router to use in index.js
module.exports = router;
