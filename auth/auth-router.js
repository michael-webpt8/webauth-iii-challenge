const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted');
const userDb = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/register', async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: 'username required' });
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'password required' });
  }
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await userDb.add(newUser);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: 'unable to create user.' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
