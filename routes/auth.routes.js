const { Router } = require('express');
const User = require('../models/User');
const router = Router();

// Endpoints
// /api/auth/register
router.post('/register', async (request, response) => {
  try {

    // Getting request fiels sent from frontend
    const { email, password } = request.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return response.status(400).json({
        message: 'User already exists'
      })
    }

  } catch(err) {

    // Setting message in case of error
    response.status(500).json({
      message: "Smth went wrong, please try again"
    })
  }
})

// /api/auth/login
router.post('/login', async (request, response) => {

})

module.exports = router;