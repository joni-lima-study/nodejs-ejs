const clientes_controller = require('../controllers/clientes_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/clientes_listar', clientes_controller.clientes_listar_get);
    router.get('/clientes_editar:id?', clientes_controller.clientes_editar_get);
    router.post('/clientes_editar', clientes_controller.clientes_editar_post);
    router.get('/clientes_deletar:id?', clientes_controller.clientes_deletar_get) 

}