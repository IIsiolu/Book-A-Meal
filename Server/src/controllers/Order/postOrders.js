import db from '../../data/order.json';

const data = db.Orders;

class PlaceOrder {
    static order(req, res){
            data.push({
                'id': data.length + 1,
                "customerName": req.body.customerName,
                "number": req.body.number,
                'name': req.body.name,
                'description': req.body.description,
                'price': req.body.price,
                'image': req.body.image
            });
            res.status(200).send({
                message: 'success',
                data: data
            });
    }
}
export default PlaceOrder;