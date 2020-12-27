const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// Endpoints
// Registation: /api/auth/register
router.post(
  '/register',
  // Validating
  [
    check('email', 'Incorrect email').isEmail(),
    check ('password', 'Minimal length is 6 digits')
      .isLength({ min: 6 }),
  ],
  async (request, response) => {
    try {
      
      // Getting validation results
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration inputs'
        });
      }

      // Getting request fiels sent from frontend
      const { email, password } = request.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return response.status(400).json({
          message: 'User already exists'
        });
      }

      // Hashing password (12 - salt for encryption )
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      response.status(201).json({
        message: 'User saved'
      });

    } catch(err) {

      // Setting message in case of error
      response.status(500).json({
        message: 'Something went wrong, please try again'
      });
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email')
      .normalizeEmail().isEmail(),
    check('password', 'Enter the password').exists(),
  ],
  async (request, response) => {
    try {

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect authorization inputs'
        });
      }

      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({
          message: 'User not found',
        });
      }

      // Comparing user password & saved (hashed) passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response.status(400).json({
          message: 'Incorrect password, please try again'
        });
      }

      // Generating jwt-token
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      response(200).json({
        token,
        userId: user.id,
      });

    } catch(err) {
  
      // Setting message in case of error
      response.status(500).json({
        message: 'Something went wrong, please try again'
      });
    }
  }
)

module.exports = router;