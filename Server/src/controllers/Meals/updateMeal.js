import db from '../../data/db.json';

const data = db.Meals;

class UpdateMeal {
    static update(req, res){
        const { id } = req.params;
        let seen = false;
        data.forEach( meal => {
            if(id == meal.id){
                
                let myreq = req.body
                console.log(req.body.name)
                seen = true
                // console.log(Object.keys(myreq))
                Object.keys(myreq).forEach( val => {
                    meal[val]=req.body[val]
                })
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