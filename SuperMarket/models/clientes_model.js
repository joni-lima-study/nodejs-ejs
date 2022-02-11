const db = require('../config/db_connection');

//to do: Posteriormente add informação de estoque

function getById(id) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM clientes WHERE id = ${id}`
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            if (result.length) {
                return resolve(result[0]);
            }
            return null;
        })
    });
}

function list(pesquisa) {
    return new Promise((resolve, reject) => {
        let qr = `
        select * from clientes WHERE ativo = 1`;

        if (pesquisa && pesquisa != '') {
            qr += ' AND LOWER(CONCAT(nome, cpf, telefone, email)) LIKE ? '
        }

        db.query(qr, [`%${pesquisa}%`], function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function save(cliente) {

    return new Promise((resolve, reject) => {
        let qrparams;
        let qr;
        if (cliente.id == '') {
            qr = `INSERT INTO clientes
            (nome,
            cpf,
            telefone,
            email)
            VALUES(?,?,?,?)`;
            qrparams = [cliente.nome,
                cliente.cpf,
                cliente.telefone,
                cliente.email]



        }
        else {
            qr = `
            UPDATE clientes
            SET
            nome = ?,
            cpf = ?',
            telefone = ?,
            email = ?
            WHERE id = ?;
            `;
            qrparams = [cliente.nome,
                cliente.cpf,
                cliente.telefone,
                cliente.email,
                cliente.id]
        }


        db.query(qr, qrparams, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function remove(id) {

    return new Promise((resolve, reject) => {
        let qr = `
            UPDATE clientes
            SET
            ativo = 0
            WHERE 
            id =?
            `;
        

        db.query(qr, [id], function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}




module.exports.list = list
module.exports.save = save
module.exports.remove = remove
module.exports.getById = getById