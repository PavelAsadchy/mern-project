const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

// Endpoints
// Registation: /api/auth/register
router.post('/register', async (request, response) => {
  try {

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
})

// /api/auth/login
router.post('/login', async (request, response) => {

})

module.exports = router;