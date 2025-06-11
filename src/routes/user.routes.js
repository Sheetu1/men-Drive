const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// GET: Register page
router.get('/register', (req, res) => {
    res.render('register');
})

// POST: Register user
router.post(
  '/register',
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('username').trim().isLength({ min: 3 }),
  body('password').trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data"
      });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    res.json(newUser);
  }
);

// GET: Login page....
router.get('/login', (req, res) => {
  res.render('login');
});

// POST: Login user...
router.post(
  '/login',
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('password').trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Invalid data',
        error: errors.array()
      });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Email or password is incorrect'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Email or Password is Incorrect'
      });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie('token', token)
    res.send('Logged In')
  }
);

module.exports = router;
