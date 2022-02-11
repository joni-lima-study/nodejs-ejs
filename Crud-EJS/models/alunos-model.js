const mongoose = require("mongoose");

const Alunos = mongoose.model("alunos", {
    nome: String,
    nota1: String,
    nota2: String,
    nota3: String,
    media: String
})

module.exports = Alunos;