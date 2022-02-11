const clientes_model = require('../models/clientes_model');


exports.clientes_listar_get = (req, res) => {
    let pesquisa = req.query.pesquisa
    clientes_model.list(pesquisa).then((clientes) => {
        let model = {
            title: "Lista de clientes",
            clientes: clientes
        };
        res.render("./views/pages/clientes_listar", model);
    })
}

exports.clientes_editar_get = (req, res) => {

    function performRender(model) {
        clientes_model.list()
            .then((clientes) => {
                model.clientes = clientes;
                model.title = "Cadastro de Produtos";
                res.render("./views/pages/clientes_editar", model);
            });

    };

    let model;

    if (req.query.id) {
        clientes_model.getById(req.query.id)
            .then((cliente) => {
                model = cliente;
                performRender(model);
            });
    }
    else {
        model = {
            id: '',
            nome: '',
            cpf: '',
            telefone: '',
            email: ''

        };
        performRender(model);
    }
};


exports.clientes_editar_post = (req, res) => {
    let cliente = req.body

    clientes_model.save(cliente)
        .then(() => {
            res.redirect("/clientes_editar");
        })
};

exports.clientes_deletar_get = (req, res) => {
    let cliente = req.query.id;
    clientes_model.remove(cliente)
        .then(() => {
            res.redirect("/clientes_listar");
        })
}