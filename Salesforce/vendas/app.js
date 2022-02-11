var express = require("express");//importando módulo express
var mongoose = require("mongoose");//Ferramenta para realizar modelagem do banco ODM

const app = express();// instanciando express, criando aplicação
const port = 3000;// definindo a porta
const DB_user = "mongodb+srv://nigerio_bezerra:nigerio_bezerra@cluster0.pdhkp.mongodb.net/vendas?retryWrites=true&w=majority"


//DB-conection
mongoose.connect(DB_user, {useNewUrlParser: true, useUnifiedTopology:true});//1/2 parâmetros para tratamento de erros e depreciações no mongoose


//Criar modelo da colection
const Produtos = mongoose.model("Produtos", {
    nome: String,
    valor: Number,
    codigoBarras: String
});

//EJS mecanismo de visualização
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");//autoriza outros arquivos a utilizar a presente
//Forma de transferência de dados
// app.use(express.urlencoded());//indica o encode
app.use(express.urlencoded({ extended: true }));//indica o encode
app.use(express.json());//converte para o formato JSON
//Acesso `public
// app.use(express.static("public"));
app.use('/public', express.static('public'));


//Router rota principal
app.get("/", (req, res)=>{
    res.send("Página Inicial");
});

//Criando uma rita para listar produtos cadastrados
app.get("/produtos", (req, res)=>{
    let itens = Produtos.find({}, (err, valor)=>{
        if(err){
            return res.status(500).send("Erro ao consultar produto!")
        }
        else{
            res.render("produtos", {itens:valor});
        }
    });
});

//router renderizar formprodutos
app.get("/cadastrarProdutos", (req, res)=>{
    res.render("formprodutos");
})

//Router guardar no banco
app.post("/cadastrarProdutos", (req, res)=>{
    let produto = new Produtos();// criando objeto do tipo produtos
    produto.nome = req.body.nome;
    produto.valor = req.body.valor;
    produto.codigoBarras = req.body.codBarras;

    produto.save((err)=>{
        if(err){
            return res.status(500).send("Erro ao cadastrar!")
        }
        else{
            return res.redirect("/produtos")
        }
    })
})

//DELETAR
app.get("/deletarProduto/:id", (req, res) => {
    let chave = req.params.id;

    Produtos.deleteOne({ _id: chave }, (err, result) => {
        if (err) {
            return res.status(500).send("Erro ao excluir registro")
        } else {
            res.redirect("/produtos")
        }
    });

})






//Definindo a porta que a aplicação está rodando
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});