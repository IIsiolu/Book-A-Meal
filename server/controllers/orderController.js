import { Order } from '../models';

class OrderController {

  static createOrder(req, res) {
    const {
      mealName, quantity, price, userId
    } = req.body;
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
          userId: req.body.userId
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
}
export default OrderController;
