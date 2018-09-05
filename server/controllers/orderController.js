import { Order, User, Meal } from '../models';
import { checkPagination, paginatedData } from '../helpers/paginate';

/**
 * @class
 */
class OrderController {
  /**
   * @description creates a user order
   * @method createOrder
   * @param {string} req
   * @param {object} res
   * @returns {object} - response to be sent to the client
   */
  static createOrder(req, res) {
    const {
      orders,
    } = req.body;
    const userId = req.user.id;
    const allOrders = orders.map(newOrder => ({
      mealId: newOrder.mealId,
      quantity: newOrder.quantity,
      address: newOrder.address,
      userId,
    }));
    Order
      .bulkCreate(allOrders, { individualHooks: true }).then((created) => {
        res.status(201).send({
          success: true,
          order: created,
        });
      }).catch(() => res.status(500).send({
        success: false,
        message: 'unexpected error',
      }));
  }

  /**
   * @description modify user order
   * @param {string} req
   * @param {object} res
   * @returns {object} res
   */
  static modifyOrder(req, res) {
    Order
      .findOne({
        where: {
          id: req.params.orderId,
        },
      }).then((order) => {
        const orderInfo = Object.assign({}, order);
        if (order.status !== 'pending') {
          res.status(401).json({
            success: false,
            message: 'order cannot be modified',
          });
        }
        order.update({ ...orderInfo, ...req.body }).then((newOrder) => {
          res.status(200).json({
            success: true,
            order: newOrder,
          });
        }).catch(() => res.status(400).json({
          success: false,
          message: 'cannot modify order, insert a valid input',
        }));
      }).catch(() => res.status(404).json({
        success: false,
        message: 'No order exist with that Id',
      }));
  }

  /**
   * Get all Orders
   * @description get all customer orders
   * @param {string} req - request
   * @param {object} res - object response
   * @returns {object} - response to be sent to client
   */
  static allOrders(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        {
          model: Meal,
          paranoid: false,
        },
        User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
    })
      .then((orders) => {
        if (orders.count === 0) {
          return res.status(404).send({
            success: false,
            message: 'Order is empty',
          });
        }
        return res.status(200).json({
          success: true,
          pagination: paginatedData(page, limit, orders),
          data: orders.rows,
        });
      }).catch(() => res.status(500).send({
        success: false,
        message: 'failed to get all orders',
      }));
  }

  /**
   * @summary method to get caterer order histories
   * @param {object} req
   * @param {object} res
   * @returns {object} res
   */
  static CatererOrders(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        {
          model: Meal,
          paranoid: false,
          where: {
            userId: req.user.id,
          },
        }, User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
    })
      .then((orders) => {
        if (orders.count === 0) {
          return res.status(404).send({
            success: false,
            message: 'Order is empty',
          });
        }
        return res.status(200).json({
          success: true,
          pagination: paginatedData(page, limit, orders),
          data: orders.rows,
        });
      }).catch(() => res.status(500).send({
        success: false,
        message: 'failed to get all orders',
      }));
  }

  /**
   * Get Order
   * @description get a particular customer order
   * @param {string} req - request
   * @param {object} res - object response
   * @returns {object} - response to be sent to client
   */
  static cusOrder(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        {
          model: Meal,
          paranoid: false,
        }, User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      where: {
        userId: req.user.id,
      },
    }).then((userOrders) => {
      if (userOrders.rows.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'Customer order is empty',
        });
      }
      return res.status(200).send({
        success: true,
        pagination: paginatedData(page, limit, userOrders),
        data: userOrders.rows,
      });
    }).catch(() => res.status(500).send({
      success: false,
      message: 'cannot get customer orders',
    }));
  }
}

export default OrderController;
