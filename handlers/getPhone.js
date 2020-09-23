module.exports = async function params(req, res, next) {
  try {
    const phone = req.phone;
    res.json(phone);
  } catch (error) {
    next(error);
  }
}
