import jwt from 'jsonwebtoken';

require('dotenv').config();


/** Class Auth */
class Auth {

  static verifyToken(req, res, next) {
    //  token
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {
      const secret = process.env.SECRET;
      jwt.verify(token, secret, (err, data) => {
        if (err || data.role !== 'user') {
          return res.status(401).json({
            message: 'Authentication failed',
          });
        }
        console.log({ data });
        req.user = data;
        next();
      });
    } else {
      // return 403 if token is not present
      return res.status(403).json({
        message: 'You need to sign up or login',
      });
    }
  }
  static verifyAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {
      const secret = process.env.SECRET;
      jwt.verify(token, secret, (err, data) => {
        if (err || !(data.role === 'admin' || data.role === 'super-admin')) {
          return res.status(401).json({
            message: 'You have to be an admin',
          });
        }
        req.user = data;

        next();
      });
    } else {
      // return 403 if token is not present
      return res.status(403).json({
        message: 'You need to sign up or login',
      });
    }
  }
}


export default Auth;
