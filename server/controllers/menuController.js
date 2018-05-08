import { Menu, Meal } from '../models';

class MenuController {
  static createMenu(req, res) {
    const { mealId, date } = req.body;
    const data = new Date(date);
    Menu
      .findOrCreate({
        where: { mealId, date: data }
      })
      .spread((menu, created) => {
        if (!created) {
          return res.status(409).send({
            result: 'Failed',
            message: 'Meal already in menu for that day'
          });
        }
        return res.status(201).send({
          result: 'success',
          message: menu
        });
      }).catch((err) => {
        res.status(500).send({
          result: 'Failed',
          message: err
        });
      });
  }
  static getMenu(req, res) {
    console.log(new Date());
    const date = req.query.date;
    console.log({
      date: 'date in menu',
      date
    });
    Menu
      .findAll({
        include: [
          Meal
        ],
        where: {
          date
        }
      }).then(menu => res.status(200).send({
        result: 'success',
        message: menu
      })).catch((error) => {
        res.status(500).send({
          result: 'Failed',
          message: error
        });
      });
  }
}

export default MenuController;
