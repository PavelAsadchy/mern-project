const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (request, response) => {
  console.log('redirect')
  try {
    const link = await Link.findOne({ code: request.params.code });

    if (link) {
      link.clicks++;
      await link.save();
      return response.redirect(link.from);
    }

    response.status(404).json('Link is not found')

  } catch (err) {
    response.status(500).json({
      message: 'Something went wrong'
    });
  }
});

module.exports = router;
