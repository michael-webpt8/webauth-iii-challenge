const express = require('express');
const restricted = require('../middleware/restricted');
const userDb = require('./users-model');

const router = express.Router();

router.get('/', restricted(), async (req, res) => {
  try {
    const users = await userDb.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
