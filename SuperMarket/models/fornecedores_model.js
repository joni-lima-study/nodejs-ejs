const db = require('../config/db_connection');


function getById(id) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM fornecedores WHERE id = ${id}`
        db.query(qr, function (err, result) {
            if (err) {
                return reject(err);
            }
            else if (result.length > 0) {
                return resolve(result[0]);
            }
            else {
                return null;
            }
        })
    });
}


function list(pesquisa) {
    return new Promise((resolve, reject) => {
        let qr = `SELECT * FROM fornecedores WHERE ativo = 1`;

        if (pesquisa && pesquisa != '') {
            qr += ' AND LOWER(CONCAT(nome, cnpj, telefone, email)) LIKE ? '
        }

        db.query(qr, [`%${pesquisa}%`], function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

function save(fornecedor) {

    return new Promise((resolve, reject) => {
        
        let qrparams;
        let qr;
        if (fornecedor.id == '') {
            qr = `INSERT INTO fornecedores
            (nome,
            cnpj,
            telefone,
            email)
            VALUES
            (?,?,?,?)`;
            qrparams = [fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.email]

        }
        else {
            qr = `
            UPDATE fornecedores
            SET
            nome = ?,
            cnpj = ?,
            telefone = ?,
            email = ?
            WHERE id = ?;
            `;
            qrparams = [fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.id]
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
            UPDATE fornecedores
            SET
            ativo = 0
            WHERE 
            id = ?
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