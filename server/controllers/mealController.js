import 'babel-polyfill';
import { Meal } from '../models';

class MealController {
  static createMeal(req, res) {
    const {
      name, description, price, image,
    } = req.body;
    Meal
      .findOrCreate({
        where: { name },
        defaults: {
          description, price, image,
        },
      })
      .spread((meal, created) => {
        if (!created) {
          return res.status(409).json({
            success: false,
            message: 'Meal already exist',
          });
        }
        return res.status(201).json({
          success: false,
          data: meal,
        });
      }).catch(() => {
        res.status(500).send({
          success: false,
          message: 'failed to create meal',
        });
      });
  }

  static allMeals(req, res) {
    Meal
      .all()
      .then(meal => res.status(200).json({
        success: true,
        data: meal,
      }))
      .catch(error => res.status(400).json(error));
  }

  static editMeal(req, res) {
    const { mealId } = req.params;

    Meal.findOne({
      where: {
        id: mealId,
      },
    }).then((meal) => {
      const userInfo = Object.assign({}, meal);
      meal.update({ ...userInfo, ...req.body }).then((newMeal) => {
        res.status(200).json({
          success: true,
          message: 'updated',
        });
      }).catch(err => res.status(400).json({
        success: false,
        message: 'fail to modify meal, Invalid input',
      }));
    })
      .catch(error => res.status(404).json({
        success: false,
        message: ' No meal with that ID',
      }));
  }
  static deleteMeal(req, res) {
    Meal.findOne({
      where: {
        id: req.params.mealId,
      },
    })
      .then((meal) => {
        if (meal) {
          meal.destroy().then(meal =>
            res.status(200).json({
              success: true,
              message: 'meal successfully deleted!',
            })).catch((err) => {
            res.status(500).send({
              success: false,
              message: 'fail to delete meal',
            });
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'There is no meal with that id!!',
          });
        }
      })
      .catch(err => res.status(400).json({
        success: false,
        message: 'Invalid Parameter In Url',
      }));
  }
}
export default MealController;
