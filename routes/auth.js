const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route POST api/auth
//@desc Auth user and get token
//@access public
router.post(
  '/',
  [
    check('username', 'Please enter username').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      //finding a user in the database with the given username
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid username' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //generating payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //Signing the token
      //the token body contains objetc user with id of the user
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/auth
//@desc Get logged in user
//@access private
router.get('/', auth, async (req, res) => {
  try {
    //the middleware auth looks at the token verify it  then sends the id of the user in req
    const user = await User.findById(req.user.id).select('-password -email');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
