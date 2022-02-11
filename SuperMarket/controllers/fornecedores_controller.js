const db_con = require('../config/db_connection');
const fornecedores_model = require('../models/fornecedores_model');
const setores_model = require('../models/setores_model');
const volumes_model = require('../models/volumes_model');
const produtos_model = require('../models/produtos_model')


exports.fornecedores_listar_get = (req, res) => {
    let pesquisa = req.query.pesquisa
    fornecedores_model.list(pesquisa).then((fornecedores) => {
        let model = {
            title: "Lista de Fornecedores",
            fornecedores: fornecedores
        };
        res.render("./views/pages/fornecedores_listar", model);
    })
}

exports.fornecedores_editar_get = (req, res) => {

    function performRender(model) {
        fornecedores_model.list()
            .then((fornecedores) => {
                model.fornecedores = fornecedores;
                model.title = "Cadastro de Produtos";
                res.render("./views/pages/fornecedores_editar", model);
            });

    };

    let model;

    if (req.query.id) {
        fornecedores_model.getById(req.query.id)
            .then((fornecedor) => {
                model = fornecedor;
                performRender(model);
            });
    }
    else {
        model = {
            id: '',
            nome: '',
            cnpj: '',
            telefone: '',
            email: ''

        };
        performRender(model);
    }
};


exports.fornecedores_editar_post = (req, res) => {
    let fornecedor = req.body

    fornecedores_model.save(fornecedor)
        .then(() => {
            res.redirect("/fornecedores_editar");
        })
};

exports.fornecedores_deletar_get = (req, res) => {
    let fornecedor = req.query.id;
    fornecedores_model.remove(fornecedor)
        .then(() => {
            res.redirect("/fornecedores_listar");
        })
}