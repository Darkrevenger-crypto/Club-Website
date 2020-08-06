const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token authentication' });
  }

  try {
    //   Im sending hashed paassword to the sevrer
    //hashed password gets confirmed then i recieve a token valid for some time
    // then all the private route access is done until i have that json web token
    //every time i sent a req to private route it goes along with token key 'x-auth-token'
    //the token is verified
    //   the payload is sent to req  is decoded and payload is stored in decoded
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //req.user gets the decoded payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
