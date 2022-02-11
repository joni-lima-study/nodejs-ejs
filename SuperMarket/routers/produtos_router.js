const produtos_controller = require('../controllers/produtos_controller');
//Direcionar para o EJS
module.exports.map = (router) => {
    router.get('/produtos_listar', produtos_controller.produtos_listar_get);
    router.get('/produtos_editar:id?', produtos_controller.produtos_editar_get);
    router.post('/produtos_editar', produtos_controller.produtos_editar_post);   
    router.get('/produtos_deletar:id?', produtos_controller.produtos_deletar_get) 
}