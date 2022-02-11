const db = require('../config/db_connection');

exports.list = (pesquisa) => {
    return new Promise((resolve, reject) => {
        let qr = `
        SELECT 
            c.id
            ,c.nf
            ,p.nome as produto_nome
            ,c.quantidade
            ,c.total
            ,c.datahora
        FROM compras as c
        JOIN produtos as p on c.produto_id = p.id
        `;
        if (pesquisa && pesquisa != '') {
            qr += ' WHERE LOWER(CONCAT(c.nf, p.nome)) LIKE ?'
        }

        db.query(qr, [`%${pesquisa}%`], function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

exports.save = (compra) => {

    return new Promise((resolve, reject) => {

        let qrparams;
        let qr = `INSERT INTO compras 
            (
            nf,
            total,
            produto_id,
            quantidade)
            VALUES
            (?,?,?,?)`;
        qrparams = [compra.nf,
        compra.total,
        compra.produto_id,
        compra.quantidade]


        db.query(qr, qrparams, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}