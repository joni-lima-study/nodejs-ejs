const db_con = require('../config/db_connection');
const fornecedores_model = require('../models/fornecedores_model');
const setores_model = require('../models/setores_model');
const volumes_model = require('../models/volumes_model');
const produtos_model = require('../models/produtos_model');
const compras_model = require('../models/compras_model');

exports.compras_listar_get = (req, res) => {
    let pesquisa = req.query.pesquisa;
    compras_model.list(pesquisa)
        .then((compras) => {
            var model = {
                title: 'Compras',
                compras: compras
            }
            res.render("./views/pages/compras_listar", model);
        })
}

exports.compras_cadastrar_get = (req, res) => {

    produtos_model.list()
        .then((produtos) => {
            let model = {
                title: 'Cadastrar Compra',
                produtos: produtos
            }
            res.render("./views/pages/compras_cadastrar", model);
        })

}

exports.compras_cadastrar_post = (req, res) => {

    compras_model.save(req.body)
        .then((compra) => {
            res.redirect("/compras_listar");
        })
}

