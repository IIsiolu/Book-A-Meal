import { Order, User, Meal } from '../models';
import { checkPagination, paginatedData } from '../helpers/paginate';

class OrderController {
  static createOrder(req, res) {
    const {
      orders,
    } = req.body;
    const userId = req.user.id;
    const allOrders = orders.map(newOrder => ({
      mealId: newOrder.mealId,
      quantity: newOrder.quantity,
      userId,
    }));
    Order
      .bulkCreate(allOrders, { individualHooks: true }).then((created) => {
        res.status(201).send({
          success: true,
          data: created,
        });
      }).catch(err => res.status(500).send({
        success: false,
        error: err,
      }));
  }

  static modifyOrder(req, res) {
    Order
      .findOne({
        where: {
          id: req.params.orderId,
        },
      }).then((order) => {
        const userInfo = Object.assign({}, order);
        order.update({ ...userInfo, ...req.body }).then((newOrder) => {
          res.status(200).json({
            result: 'updated',
            message: newOrder,
          });
        }).catch(err => res.status(400).json({
          result: 'failed',
          message: 'cannot create order, put a valid input',
        }));
      }).catch(err => res.status(404).json({
        result: 'failed',
        message: 'No order exist with that Id',
      }));
  }

  static allOrders(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        Meal, User,
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
      }).catch(error => res.status(500).send({
        success: false,
        message: 'failed to get all orders',
      }));
  }

  static cusOrder(req, res) {
    const { page, limit, offset } = checkPagination(req);
    Order.findAndCountAll({
      include: [
        Meal, User,
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      where: {
        userId: req.user.id,
      },
    }).then((userOrders) => {
      if (userOrders.length === 0) {
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
    }).catch(err => res.status(500).send({
      success: false,
      message: 'cannot get customer orders',
    }));
  }
}
export default OrderController;
