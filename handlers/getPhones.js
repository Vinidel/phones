const phoneService = require('../services/phoneService');

module.exports = async function params(req, res, next) {
  try {
    const phones = await phoneService.getAll();
    res.json(phones);
  } catch (error) {
    next(error);
  }
}
