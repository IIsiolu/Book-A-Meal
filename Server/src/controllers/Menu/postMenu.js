import menuDb from '../../data/menuDb.json';

const data = menuDb.Menu;

class PostMenu {
    static today(req, res){
        data.push({
            'id': data.length + 1,
            'name': req.body.name,
            'description': req.body.description,
            'price': req.body.price,
            'image': req.body.image
        });
        res.status(201).send({
            message: 'success',
            data: data
        });
    }
}

export default PostMenu;