import { Menu, Meal } from '../models';
import { checkPagination, paginatedData } from '../helpers/paginate';

/**
 * @class
 */
class MenuController {
  /**
   * Create Menu
   * @description allows caterers to create a menu
   * @param {string} req - request
   * @param {object} res - object response
   * @returns {object} - response to be sent to client
   */
  static createMenu(req, res) {
    const { date } = req.body;
    const userId = req.user.id;
    const data = new Date(date);
    const meals = { ...req.body, userId };

    Menu.findOne({
      where: { date: data, userId },
    }).then((found) => {
      if (found) {
        res.status(409).send({
          success: false,
          message: 'meal already exist for that day',
        });
      } else {
        Menu.create(meals, {
          include: Meal,
        }).then((created) => {
          res.status(201).send({
            success: true,
            menu: created,
          });
        }).catch(() => res.status(500).send({
          success: false,
          message: 'something went wrong',
        }));
      }
    });
  }

  /**
   * @summary method to get menu for a specific day
   * @param {string} req - request
   * @param {object} res - object response
   * @returns {object} - response to be sent to client
   */
  static async getMenu(req, res) {
    const date = req.query.date || new Date().setHours(0, 0, 0, 0);
    const { page, limit, offset } = checkPagination(req);
    try {
      const menuId = await Menu.findAll({ where: { date } });

      if (menuId.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'no menu for that day',
        });
      }
      // meal ID's
      let meals = [];
      menuId.forEach((menu) => {
        meals = [...meals, ...menu.mealId];
      });
      const menuMeals = await Meal.findAndCountAll({
        where: { id: meals },
        limit,
        offset,
      });
      return res.status(200).send({
        success: true,
        pagination: paginatedData(page, limit, menuMeals),
        menu: menuMeals.rows,
      });
    } catch (err) {
      return res(500).send({
        success: false,
        message: 'something went wrong',
      });
    }
  }
}

export default MenuController;
