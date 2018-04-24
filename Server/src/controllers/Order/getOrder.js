import db from '../../data/order.json';

const data = db.Orders;

class AllOrders {
    static getOrder(req, res){
        res.status(200).send(data);
    }
}
export default AllOrders;