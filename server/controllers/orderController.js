import { Order, User, Meal } from '../models';

class OrderController {
  static createOrder(req, res) {
    const {
      mealId, quantity,
    } = req.body;
    const userId = req.user.id;
    Order
      .create({
        quantity,
        mealId,
        userId,
      }).then(order => res.status(201).send({
        result: 'success',
        message: order,
      })).catch((err) => {
        res.status(500).send({
          result: 'failed',
          message: 'cannot create meal order',
        });
      });
  }

  static modifyOrder(req, res) {
    Order
      .findOne({
        where: {
          id: req.params.orderId,
        },
      }).then((order) => {
        const userInfo = Object.assign({}, order);
        // console.log({ userInfoInDb: userInfo });
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
    Order.all({
      include: [
        Meal, User,
      ],
    })
      .then(orders => res.status(200).json({
        result: 'success',
        message: orders,
      })).catch(error => res.status(400).json('failed to get all orders'));
  }
}
export default OrderController;
