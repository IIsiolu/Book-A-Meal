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
        res.status(200).send(data);
    }
}

export default PostMenu;