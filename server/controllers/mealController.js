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
        console.log(err);
        res.status(500).send({
          result: 'Failed',
          message: err
        });
      });
  }

  static allMeals(req, res) {
    Meal
      .all()
      .then(meal => res.status(200).json({
        result: 'success',
        message: meal
      }))
      .catch(error => res.status(400).json(error));
  }

  static editMeal(req, res) {
    const { mealId } = req.params;

    Meal.findOne({
      where: {
        id: mealId
      }
    }).then((meal) => {
      meal.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      });
      res.status(200).json({
        result: 'updated',
        message: meal
      });
    })
      .catch(err => res.status(404).json({
        result: 'failed',
        message: ' No meal with that ID'
      }));


  }
}
export default MealController;
