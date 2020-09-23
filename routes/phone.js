const express = require('express');
const getPhones = require('../handlers/getPhones');
const patchPhone = require('../handlers/patchPhone');
const withID = require('../handlers/withID');
const getPhone = require('../handlers/getPhone');

const router = express.Router();
router.param('id', withID);
router
  .route('/')
  .get(getPhones)

router
  .route('/:id')
  .get(getPhone)
  .patch(patchPhone)


module.exports = router;
