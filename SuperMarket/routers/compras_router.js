const compras_controller = require('../controllers/compras_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/compras_listar', compras_controller.compras_listar_get);
    router.get('/compras_cadastrar', compras_controller.compras_cadastrar_get);
    router.post('/compras_cadastrar', compras_controller.compras_cadastrar_post);
}