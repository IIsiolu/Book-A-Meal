import db from '../../data/order.json';

const data = db.Orders;

class ModifyOrder {
    static update(req, res){
        const { orderId } = req.params;
        let seen = false;
        data.forEach( order => {
            if(orderId == order.id){
                seen = true
                // console.log(Object.keys(myreq))
                let myreq = req.body
                Object.keys(myreq).forEach( val => {
                    order[val]=req.body[val]
                })
                return(
                    res.status(200).send({
                        message: 'success',
                        data: order
                    })
                )
            }
           
        })
        if(!seen){
            res.status(404).send({
                message: 'order does not exist'
            })
        }
       
    }
}
export default ModifyOrder;