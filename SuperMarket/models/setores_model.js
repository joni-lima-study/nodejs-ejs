const express = require('express');
const { get } = require('http');
const db = require('../config/db_connection');


const qr = `SELECT * FROM setores`

function list() {
    return new Promise((resolve, reject) => {
        db.query(qr, function(err, result){
            if(err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

module.exports.list = list