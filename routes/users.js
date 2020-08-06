const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//@route POST /api/users
//desc Register a user
//@access PUBLIC
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('username', 'Unique Username is required').not().isEmpty(),
    check(
      'password',
      'Please enter a passwod with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password, email } = req.body;

    try {
      let user = await User.findOne({ username });
      let userEmail;
      try {
        userEmail = await User.findOne({ email });
        if (userEmail) {
          return res.status(400).json({ msg: 'Email is already taken' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
      if (user) {
        return res.status(400).json({ msg: 'Username already exists' });
      }
      //Create a new user
      user = new User({
        name,
        email,
        password,
        username,
      });

      //for hashing password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

//@route GET /api/users
//@desc Get all users
//@acces Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -date')
      .sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
