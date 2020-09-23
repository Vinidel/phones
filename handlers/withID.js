const phoneService = require('../services/phoneService');

module.exports = async function phoneNumber(req, res, next) {
  try {
    const {id} = req.params;
    const phone = await phoneService.getById(id);
    if (!phone) {
      const error = new Error('No phone found');
      error.status = 400;
      next(error);
    } else {
      req.phone = phone;
      next();
    }
  } catch (error) {
    next(error);
  }
}
