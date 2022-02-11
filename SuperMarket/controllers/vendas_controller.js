const produtos_model = require('../models/produtos_model');
const vendas_model = require('../models/vendas_model');
const clientes_model = require('../models/clientes_model');

exports.vendas_cadastrar_get = (req, res) => {

    let model = {
        title: 'Cadastrar Venda'
    }

    produtos_model.list()
        .then((produtos) => {
            model.produtos = produtos;
            clientes_model.list()
                .then((clientes) => {
                    model.clientes = clientes;
                    res.render("./views/pages/vendas_cadastrar", model);
                })

        })

}

exports.vendas_cadastrar_post = (req, res) => {
    vendas_model.save(req.body)
        .then((resultado) => {
            res.redirect("/vendas_cadastrar")
        })
        .catch((reason) => {

            var model = req.body;
            model.error = 'reason'
            res.render("./views/pages/vendas_cadastrar", model);
        });
}

exports.vendas_listar_get = (req, res) => {
    vendas_model.list()
    .then((vendas)=> {
        var model = {
            title: 'vendas',
            vendas: vendas
        }
        res.render("./views/pages/vendas_listar", model);
    })
}