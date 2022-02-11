const home_controller = require('../controllers/home_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/', home_controller.home_listar_get);
}