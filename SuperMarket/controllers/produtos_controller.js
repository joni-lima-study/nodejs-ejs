const db_con = require('../config/db_connection');
const fornecedores_model = require('../models/fornecedores_model');
const setores_model = require('../models/setores_model');
const volumes_model = require('../models/volumes_model');
const produtos_model = require('../models/produtos_model')


exports.produtos_listar_get = (req, res) => {

    let pesquisa = req.query.pesquisa;

    produtos_model.list(pesquisa).then((produtos) => {
        let model = {
            title: "Cadastro de Produtos",
            produtos: produtos,
        };
        res.render("./views/pages/produtos_listar", model);
    })
};

exports.produtos_editar_get = (req, res) => {

    function performRender(model) {
        fornecedores_model.list()
            .then((fornecedores) => {
                model.fornecedores = fornecedores;
                setores_model.list()
                    .then((setores) => {
                        model.setores = setores;
                        volumes_model.list()
                            .then((volumes) => {
                                model.volumes = volumes;
                            })
                            .then(() => {
                                model.title = "Cadastro de Produtos",
                                    res.render("./views/pages/produtos_editar", model);
                            })
                    })
            });
    }


    let model;

    if (req.query.id) {
        produtos_model.getById(req.query.id)
            .then((produto) => {
                model = produto;
                performRender(model);
            });
    }
    else {
        model = {
            id: '',
            nome: '',
            fornecedor_id: '',
            volume_id: '',
            setor_id: '',
            preco: ''
        };
        performRender(model);
    }
};

exports.produtos_editar_post = (req, res) => {
    let produto = req.body

    produtos_model.save(produto)
        .then(() => {
            res.redirect("/produtos_listar");
        })
};

exports.produtos_deletar_get = (req, res) => {
    let produto = req.query.id;
    produtos_model.remove(produto)
        .then(() => {
            res.redirect("/produtos_listar");
        })
}