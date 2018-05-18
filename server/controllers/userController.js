import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'babel-polyfill';
import { User } from '../models';

const secret = process.env.SECRET;

class UserController {
  static signup(req, res) {
    const {
      password, firstname, lastname, email,
    } = req.body;
    User
      .findOrCreate({
        where: { email },
        defaults: {
          password, firstname, lastname, role: req.body.role || 'user',
        },
      })
      .spread((user, created) => {
        if (!created) {
          return res.status(409).send({
            success: false,
            message: 'User already exist',
          });
        }
        const createdUser = {
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          email: user.email,
        };
        return res.status(201).send({
          success: true,
          data: createdUser,
        });
      }).catch((err) => {
        res.status(500).send({
          success: false,
          message: 'User cannot be created',
        });
      });
  }

  static async signin(req, res) {
    try {
      const check = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (check) {
        bcrypt.compare(req.body.password, check.password, (err, response) => {
          if (response) {
            const token = jwt.sign({
              id: check.id,
              role: check.role,
              firstname: check.firstname,
            }, secret, { expiresIn: '500h' });
            return res.status(200).json({
              success: true,
              message: `Welcome ${check.firstname}`,
              token,
            });
          }
          return res.status(409).json({
            success: false,
            message: 'Email or password is incorrect',
          });
        });
      } else {
        res.status(404).json({
          success: 'false',
          message: 'Email or password incorrect',
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'User cannot be signed in',
      });
    }
  }

  static async getUsers(req, res) {
    const allUsers = await User.all();
    try {
      if (allUsers) {
        return res.status(201).json({
          result: 'success',
          allUsers,
        });
      }
      return res.status(404).send({
        result: 'failed',
      });
    } catch (err) {
      return res.json({
        result: 'failed',
        err,
      });
    }
  }
}
export default UserController;
