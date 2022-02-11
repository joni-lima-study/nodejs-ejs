const fornecedores_controller = require('../controllers/fornecedores_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/fornecedores_listar', fornecedores_controller.fornecedores_listar_get);
    router.get('/fornecedores_editar:id?', fornecedores_controller.fornecedores_editar_get);
    router.post('/fornecedores_editar', fornecedores_controller.fornecedores_editar_post);
    router.get('/fornecedores_deletar:id?', fornecedores_controller.fornecedores_deletar_get) 

}