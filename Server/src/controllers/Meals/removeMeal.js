import db from '../../data/db.json';

const data = db.Meals;

class RemoveMeal {
    static delet(req, res){
        const { mealId } = req.params;
        let seen = false;
        data.map( (meal, key) => {
            if(mealId == meal.id){
                console.log({meal: meal});
                seen = true
                data.splice(key, 1);
                return(
                    res.status(200).send({
                        message: 'Success',
                        data: data
                    })
                );
            }
        });
        if(!seen){
            res.status(404).send({
                message: 'meal does not exist',
    
            });
        }
        
    }
}
export default RemoveMeal;