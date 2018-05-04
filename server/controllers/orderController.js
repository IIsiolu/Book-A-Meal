import { Order } from '../models';

class OrderController {

  static createOrder(req, res) {
    const {
      mealName, quantity, price
    } = req.body;
    const userId = req.user.id;
    Order
      .create({
        quantity,
        price,
        mealName,
        userId
      }).then(order => res.status(201).send({
        result: 'success',
        message: order
      })).catch((err) => {
        console.log(err);
        res.status(500).send({
          result: 'failed',
          message: err
        });
      }
      );

  }

  static modifyOrder(req, res) {
    Order
      .findOne({
        where: {
          id: req.params.orderId
        }
      }).then((order) => {
        order.update({
          mealName: req.body.mealName,
          quantity: req.body.quantity,
          price: req.body.price,
          userId: req.user.id
        });
        res.status(200).json({
          result: 'updated',
          message: order
        });
      })
      .catch(err => res.status(404).json({
        result: 'failed',
        message: ' No order with that ID'
      }));
  }

  static allOrders(req, res) {
    Order.all()
      .then(orders => res.status(200).json({
        result: 'success',
        message: orders
      })).catch(error => res.status(400).json(error));
  }
}
export default OrderController;
