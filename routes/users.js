const express = require('express');
const getUser = require('../handlers/getUser');

const router = express.Router();

// I didn't know if I should limite the response with only the phone numbers
// so I just returned the full user object
// Otherwise I could use a query string to only get that specific property
router
  .route('/:id')
  .get(getUser)

module.exports = router;
