import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'babel-polyfill';
import { User } from '../models';

// user token secret
const secret = process.env.SECRET;

/**
 * @class
 */
class UserController {
  /**
  * Sign up user
  * @description sign up user with valid details
  * @param  {string} req - request object
  * @param  {Object} res - response object
  * @returns {Object}  response to be sent to client
  */
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
        const token = jwt.sign({
          id: user.id,
          role: user.role,
        }, secret, { expiresIn: '500h' });
        return res.status(201).send({
          success: true,
          message: 'user created successfully',
          token,
        });
      }).catch((err) => {
        res.status(500).send({
          success: false,
          message: 'User cannot be created',
          err,
        });
      });
  }

  /**
  * Login user
  * @description Log's in user with valid details
  * and generates a jwt token for further authentication
  * @param  {string} req - request object
  * @param  {Object} res - response object
  * @returns {Object}  response to be sent to client
  */
  static async signin(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      // user contains object with data Values
      if (user) {
        bcrypt.compare(req.body.password, user.password, (error, response) => {
          if (response) {
            const token = jwt.sign({
              id: user.id,
              role: user.role,
            }, secret, { expiresIn: '500h' });
            return res.status(200).json({
              success: true,
              message: `Welcome ${user.firstname}`,
              token,
            });
          }
          return res.status(401).send({
            success: false,
            error,
            message: 'Email or password is incorrect',
          });
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User does not exist',
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'User cannot be signed in',
      });
    }
  }

  /**
  * get users
  * @description get all users in the database
  * @param  {string} req - request object
  * @param  {Object} res - response object
  * @returns {Object}  response to be sent to client
  */
  static async getUsers(req, res) {
    const allUsers = await User.all();
    try {
      if (allUsers) {
        return res.status(201).json({
          success: true,
          allUsers,
        });
      }
      return res.status(404).send({
        message: 'failed',
      });
    } catch (err) {
      return res.json({
        success: false,
        message: 'failed to get users',
      });
    }
  }
}

export default UserController;
