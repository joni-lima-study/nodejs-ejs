const home_model = require('../models/home_model');


exports.home_listar_get = (req, res) => {
    home_model.list()
    .then((produtos)=> {
        var model = {
            title: 'Home',
            produtos: produtos
        }
        res.render("./views/pages/home_listar", model);
    })
}