const db = require('../config/db_connection');

exports.list = (pesquisa) => {
    return new Promise((resolve, reject) => {
        let qr = `
        SELECT 
            v.id
            ,v.nf
            ,p.nome as produto_nome
            ,c.nome as cliente_nome
            ,v.quantidade
            ,v.total
            ,v.datahora
        FROM vendas as v
        JOIN produtos as p on v.produto_id = p.id
        JOIN clientes as c on v.cliente_id = c.id
        `;

        if (pesquisa && pesquisa != '') {
            qr += ` and LOWER(CONCAT(p.nome, c.nome, v.quantidade, v.total, v.datahora)) LIKE LOWER(?)`;
        }
        console.log(qr);
        
        db.query(qr, [`%${pesquisa}%`], function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

exports.save = (venda) => {
    return new Promise((resolve, reject) => {

        function performVenda() {
            let qrparams;
            let qr = `INSERT INTO vendas 
            (
            nf,
            cliente_id,
            produto_id,
            quantidade,
            total,
            datahora)
            VALUES
            (?,?,?,?,?);
            `;
            qrparams = [venda.nf,
                venda.cliente_id,
                venda.produto_id,
                venda.quantidade,
                venda.total];




            db.query(qr, qrparams ,function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
        }

        var pquery = `
        select  (IFNULL((select sum(quantidade) from compras where compras.produto_id = p.id), 0)
                    -
                    (IFNULL((select sum(quantidade) from vendas where vendas.produto_id = p.id), 0))) as estoque
        from produtos as p 
        where id = ?
        `

        db.query(pquery,[venda.produto_id], function (err, result) {
            if (err) {
                return reject(err);
            }
            if (result[0].estoque > venda.quantidade) {
                performVenda()
            }
            else {
                reject('estoque insuficiente');
            }
        })
    });
}