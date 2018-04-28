// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'babel-polyfill';
import { User } from '../models';

class UserController {

  static signup(req, res) {
    const {
      password, firstname, lastname, email
    } = req.body;
    User
      .findOrCreate({
        where: { email },
        defaults: {
          password, firstname, lastname, role: 'user'
        }
      })
      .spread((user, created) => {
        if (!created) {
          return res.status(301).send({
            result: 'Failed',
            message: 'User already exist'
          });
        }
        return res.status(200).send({
          result: 'success',
          message: user
        });
      }).catch((err) => {
        res.status(500).send({
          result: 'Failed',
          message: err
        });
      });
  }

  static async signin(req, res) {
    try {
      const check = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (check) {
        bcrypt.compare(
          req.body.password, check.password, (err, response) => {
            if (response) {
              return res.status(200).json({
                result: 'success',
                message: `welcome ${check.firstname}`
              });
            }
            return res.status(409).json({
              result: 'failed',
              message: 'Email or password is incorrect'
            });
          }
        );
      } else {
        res.status(404).json({
          result: 'failed',
          message: 'Email or password incorrect'
        });
      }
    }
    catch (err) {
      console.log({
        err
      });
    }
  }
}
export default UserController;
