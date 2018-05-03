import { Menu } from '../models';

class MenuController {

  static createMenu(req, res) {
    const { mealName, date } = req.body;
    Menu
      .findOrCreate({
        where: { mealName, date }
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
    Menu
      .findAll({
        where: {
          date: '2018-05-02T00:00:00.000Z'
        }
      }).then(menu => res.status(200).send({
        result: 'success',
        message: menu
      })).catch((error) => {
        res.status(500).send({
          result: 'Failed',
          message: err
        });
      });
  }
}

export default MenuController;
