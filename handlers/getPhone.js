module.exports = function params(req, res, next) {
  const phone = req.phone;
  res.json(phone);
}
