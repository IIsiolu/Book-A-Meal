import db from '../data/db.json';

const data = db.Meals;

class RemoveMeal {
    static delet(req, res){
        const { mealId } = req.params;
        data.map( (meal, key) => {
            if(mealId == meal.id){
                console.log({meal: meal});
                data.splice(key, 1);
                return(
                    res.status(200).send(data)
                );
            }
        });
        res.status(200).send('meal does not exist');
    }
}
export default RemoveMeal;