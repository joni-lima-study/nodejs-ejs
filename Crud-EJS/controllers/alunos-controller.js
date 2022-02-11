// IMPORTANDO O MODELO DO BANCO
const aluno_db = require("../models/alunos-model");


//DEFININDO A FUNCIONALIDADE DA ROTA BOLETIM
exports.listar_boletim = (req, res) => {
    aluno_db.find({}, (err, boletim) => {
        if (err) {
            return res.status(500).send("Erro ao consultar boletim!");
        }
        else {
            res.render("pages/boletim", { resultado: boletim });
        }
    })
}


//DEFININDO A FUNCIONALIDADE DA ROTA CADASTRAR BOLETIM
exports.cadastrar_boletim_get = (req, res) => {
    return res.render("pages/formBoletim")
}

exports.cadastrar_boletim_post = (req, res) => {
    let salva_boletim = new aluno_db();

    salva_boletim.nome = req.body.nome;
    salva_boletim.nota1 = req.body.nota1;
    salva_boletim.nota2 = req.body.nota2;
    salva_boletim.nota3 = req.body.nota3;
    salva_boletim.media = (parseInt(req.body.nota1) + parseInt(req.body.nota2) + parseInt(req.body.nota3)) / 3;

    salva_boletim.save((err) => {
        if (err) {
            return res.status(500).send("Erro ao salvar no BD!");
        }
        else {
            return res.redirect("/boletim");
        }
    });

};

//DEFININDO A FUNCIONALIDADE DA ROTA DELETAR BOLETIM
exports.deletar_boletim = (req, res) => {
    var id = req.params.id;

    aluno_db.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res.status(500).send("Erro ao deletar!")
        }
        else {
            return res.redirect("/boletim")
        }
    })
}

//DEFININDO A FUNCIONALIDADE DA ROTA EDITAR BOLETIM
exports.editar_boletim_get = (req, res) => {
    var id = req.params.id;

    aluno_db.findById(id, (err, boletim) => {
        if (err) {
            return res.status(500).send("Erro ao editar");
        }
        else {
            return res.render("pages/formEditarBoletim", { resultado: boletim })
        }
    })
}

exports.editar_boletim_post = (req, res) => {
    var id = req.body.id;
    aluno_db.findById(id, (err, aluno) => {
        if (err) {
            return res.status(500).send("Erro ao editar");
        }
        else {
            aluno.nome = req.body.nome;
            aluno.nota1 = req.body.nota1;
            aluno.nota2 = req.body.nota2;
            aluno.nota3 = req.body.nota3;
            aluno.media = (parseInt(req.body.nota1) + parseInt(req.body.nota2) + parseInt(req.body.nota3)) / 3;

            aluno.save((err) => {
                if (err) return res.status(500).send("Erro ao cadastrar");
                return res.redirect("/boletim");
            });
        }

    });
};