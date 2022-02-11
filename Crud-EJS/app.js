var express = require("express");
const app = express();


const port = 3000;

//Comando que adiciona o mongoose ao nosso arquivo
const mongoose = require("mongoose");
const data_base = "mongodb+srv://nigerio_nigerio:nigerio_nigerio@cluster0.nsyro.mongodb.net/escola?retryWrites=true&w=majority"
mongoose.connect(data_base, {useNewUrlParser: true, useUnifiedTopology: true});


//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Acesso à public
app.use("/public", express.static("public"));


//ROTA PRINCIPAL DA NOSSA APLICAÇÃO
const produtos_router = require("./routers/alunos-router")
app.use("/", produtos_router)






//CONEXÃO COM O SERVIDOR
app.listen(port, ()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});