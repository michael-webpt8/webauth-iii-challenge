const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted');
const userDb = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

module.exports = router;
