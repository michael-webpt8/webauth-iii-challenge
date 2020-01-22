const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted');
const userDb = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  if (!req.body.username) {
    res.status(400).json({ message: 'username required' });
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'password required' });
  }
  if (!req.body.department) {
    res.status(400).json({ message: 'department required please' });
  }
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    department: req.body.department,
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

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userDb.findBy({ username }).first();

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (user && passwordCheck) {
      const token = jwt.sign(
        {
          subject: user.id,
          username: user.username,
          department: user.department,
        },
        secrets.jwt,
        {
          expiresIn: '7d',
        }
      );

      res
        .status(200)
        .json({ message: `Welcome ${user.username}`, token: token });
    } else {
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
