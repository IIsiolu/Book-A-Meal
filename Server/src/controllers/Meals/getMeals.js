import db from '../../data/db.json';

const data = db.Meals;

class AllMeals {
    static all(req, res){
        res.status(200).send(data);
    }
}
export default AllMeals;