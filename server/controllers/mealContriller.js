import 'babel-polyfill';
import { Meal } from '../models';

class MealController {

  static createMeal(req, res) {
    const {
      name, description, price, image
    } = req.body;
    Meal
      .findOrCreate({
        where: { name },
        defaults: {
          description, price, image
        }
      })
      .spread((meal, created) => {
        if (!created) {
          return res.status(409).json({
            result: 'Failed',
            message: 'Meal already exist'
          });
        }
        return res.status(201).json({
          result: 'success',
          message: meal
        });
      }).catch((err) => {
        console.log(err)
        res.status(500).send({
          result: 'Failed',
          message: err
        });
      });
  }
}
export default MealController;
