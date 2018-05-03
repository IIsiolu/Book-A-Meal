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
}
export default OrderController;
