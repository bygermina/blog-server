const express = require('express');

const router = express.Router();

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  res.send(`User ID: ${userId}`);
});

router.post('/users', (req, res) => {
  res.send('User created');
});

module.exports = router;
