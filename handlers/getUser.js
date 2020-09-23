const userService = require('../services/userService');

module.exports = async function getUser(req, res, next) {
  try {
    const {id} = req.params;
    const user = await userService.getById(id);
    if (!user) {
      const error = new Error('No user found');
      error.status = 400;
      next(error);
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
}
