const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err) => {
      if(err) {
        res.status(401).json({ error: err });
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({ error: "You need to log in first, fool." })
  }
};
