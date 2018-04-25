import db from '../../data/db.json';

const data = db.Meals;

class UpdateMeal {
    static update(req, res){
        const { id } = req.params;
        let seen = false;
        data.forEach( meal => {
            if(id == meal.id){
                seen = true
                meal.name = req.body.name;
                meal.description = req.body.description;
                meal.image = req.body.image;
                meal.price = req.body.price;
                return(
                    res.status(200).json({
                        message: 'success',
                        result: meal
                    })
                )
            }
           
        })
    if(!seen){
        res.status(404).send({
            message: 'meal does not exist'
        })
    }
       
    }
}
export default UpdateMeal;