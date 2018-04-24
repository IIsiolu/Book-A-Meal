import menuDb from '../../data/menuDb.json';

const data = menuDb.Menu;

class GetMenu {
    static menus(req, res){
        res.status(200).send(data);
    }
}

export default GetMenu;