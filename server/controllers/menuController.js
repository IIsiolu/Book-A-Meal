import { Menu, Meal } from '../models';

class MenuController {
  static createMenu(req, res) {
    const { mealId, date } = req.body;
    const data = new Date(date);
    Menu
      .findOrCreate({
        where: { mealId, date: data },
      })
      .spread((menu, created) => {
        if (!created) {
          return res.status(409).send({
            result: 'Failed',
            message: 'Meal already in menu for that day',
          });
        }
        return res.status(201).send({
          result: 'success',
          message: menu,
        });
      }).catch((err) => {
        res.status(500).send({
          result: 'Failed',
          message: 'cannot create menu, check your input',
        });
      });
  }
  static getMenu(req, res) {
    const date = req.query.date || new Date().setHours(0, 0, 0, 0);
    Menu
      .findAll({
        include: [
          Meal,
        ],
        where: {
          date,
        },
      }).then((menu) => {
        if (menu.length === 0) {
          return res.status(404).send({
            result: 'failed',
            message: 'no menu for that day',
          });
        }
        res.status(200).send({
          result: 'success',
          message: menu,
        });
      }).catch((error) => {
        res.status(500).send({
          result: 'Failed',
          message: error,
        });
      });
  }
}

export default MenuController;
