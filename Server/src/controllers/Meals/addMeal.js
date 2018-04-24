import db from '../../data/db.json';

const data = db.Meals;

class AddMeal {
    static add(req, res){
            data.push({
                'id': data.length + 1,
                'name': req.body.name,
                'description': req.body.description,
                'price': req.body.price,
                'image': req.body.image
            });
            res.status(200).send(data);
    }
}
export default AddMeal;