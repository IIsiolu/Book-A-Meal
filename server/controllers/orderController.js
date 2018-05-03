import { Order } from '../models';

class OrderController {

  static createOrder(req, res) {
    const {
      mealId, quantity, price, image
    } = req.body;
    Order
      .create({
        quantity,
        price,
        image,
        mealId,
        userId: 1,
      }).then(order => res.status(201).send({
        result: 'success',
        message: order
      })).catch(err => res.status(500).send({
        result: 'failed',
        message: err
      }));
  }
}
export default OrderController;
