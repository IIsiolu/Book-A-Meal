// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { User } from '../models';

class UserController {

  static signup(req, res) {
    const {
      password, fullname, email, role
    } = req.body;
    User
      .findOrCreate({
        where: { email },
        defaults: {
          password, role, fullname
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
}
export default UserController;
