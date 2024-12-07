const express = require('express');
const db = require('./db');
const router = express.Router();

// Obtener todos los gastos
router.get('/expenses', (req, res) => {
  const sql = 'SELECT * FROM expenses';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Crear un nuevo gasto
router.post('/expenses', (req, res) => {
  const { description, amount } = req.body;
  const sql = 'INSERT INTO expenses (description, amount) VALUES (?, ?)';
  db.query(sql, [description, amount], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: result.insertId, description, amount });
  });
});

module.exports = router;
