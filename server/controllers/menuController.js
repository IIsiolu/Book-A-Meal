import { Menu, Meal } from '../models';

class MenuController {

  static createMenu(req, res) {
    const { mealId, date } = req.body;
    const data = new Date(date);

    Menu.findOne({
      where: { date: data },
    }).then((found) => {
      if (found) {
        res.status(400).send({
          success: false,
          message: 'meal already exist for that day',
        });
      }
      else {
        const allMenu = mealId.map(id => ({
          mealId: id,
          date: data,
        }));
        Menu.bulkCreate(allMenu, { individualHooks: true }).then((created) => {
          res.status(201).send({
            success: true,
            data: created,
          });
        }).catch(err => res.status(500).send({
          success: false,
          error: 'could not create menu',
        }));
      }
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
            success: false,
            message: 'no menu for that day',
          });
        }
        res.status(200).send({
          success: true,
          data: menu,
        });
      }).catch((error) => {
        res.status(500).send({
          success: false,
          message: 'cannot get all menu',
        });
      });
  }
}

export default MenuController;
