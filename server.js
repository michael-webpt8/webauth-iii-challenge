const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./auth/auth-router');

const router = express();
router.use(helmet());
router.use(cors());
router.use(express.json());

router.use('/api', authRouter);

router.get('/', (req, res) => {
  res.send('API is up');
});

router.use((req, res) => {
  res.status(404).json({ message: 'Sorry!, page 404 not found' });
});

router.use((err, req, res, next) => {
  console.log('500 server error, remove before production ', err); //! rm before production
  res
    .status(500)
    .json({ errorMessage: 'Server error, sorry try again later.' });
});

module.exports = router;
