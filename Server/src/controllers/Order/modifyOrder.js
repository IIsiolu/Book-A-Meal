import db from '../../data/order.json';

const data = db.Orders;

class ModifyOrder {
    static update(req, res){
        const { orderId } = req.params;
        data.forEach( order => {
            if(orderId == order.id){
                order.name = req.body.name;
                order.number = req.body.number;
                order.customerName = req.body.customerName;
                order.description = req.body.description;
                order.image = req.body.image;
                order.price = req.body.price;
                return(
                    res.status(200).send(data)
                )
            }
           
        })
        res.status(404).send({
            message: 'order does not exist'
        })
    }
}
export default ModifyOrder;