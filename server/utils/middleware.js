const db = require("../config/db");
const rateLimit = require("express-rate-limit");

/**
 * * set db middleware
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function attachDB(req, res, next) {
  req.db = db;

  next();
}

/**
 * * set limit
 */
const limiter = rateLimit({
  windowMs: 1000,
  max: 30,
});

module.exports = { attachDB, limiter };
