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
      const check = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      // check contains object with data Values
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
          return res.status(409).send({
            success: false,
            error: err,
            message: 'Email or password is incorrect',
          });
        });
      } else {
        res.status(404).json({
          success: false,
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
  
  /**
  * Edit user
  * @description Edit user
  * @param  {string} req - request object
  * @param  {Object} res - response object
  * @returns {Object}  response to be sent to client
  */
  static async editUser(req, res) {
    try {
      const check = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (check) {
        const userInfo = Object.assign({}, check);
        check.update({...userInfo, ...req.body}).then((update) => {
          res.status(200).send({
            success: true,
            data: update
          })
        }).catch((err) => {
          return res.status(400).send({
            success: false,
            error: err,
            message: 'user update failed'
          })
        })

      } else {
        res.status(404).json({
          success: false,
          message: 'user does not exist',
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err
      })
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
        result: 'failed',
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
