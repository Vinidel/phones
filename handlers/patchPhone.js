const phoneService = require('../services/phoneService');

module.exports = async function patch(req, res, next) {
  try {
    const phone = req.phone;
    // Activating it directly since there is no other info to be patched
    phone.isActive = true;
    const result = await phoneService.patch(phone);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
