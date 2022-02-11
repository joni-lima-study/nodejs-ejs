var express = require("express");
var mongoose = require("mongoose");

const app = express();

const port = 3000;
const data_base = "put your mongodb connection here"


//DB-Connection

mongoose.connect(data_base, {useNewUrlParser: true, useUnifiedTopology:true});

//Criar modelo da colection

const Alunos = mongoose.model("alunos", {
    nome: String,
    nota1: Number,
    nota2: Number,
    nota3: Number,
    media: Number
})

//ejs mecanismo de view
app.set("view engine", "ejs");
app.set("views", __dirname, "/views")

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Router
app.get("/", (req, res)=>{
    res.send("página inicial");
});

//rota para listagem soa alunos e notas
app.get("/boletim", (req, res)=>{
    let itens = Alunos.find({}, (err, valor)=>{
        if(err){
            return res.status(500).send("Erro ao consultar produto!")
        }
        else{
            res.render("boletim", {itens:valor});
        }
    });
});

//router renderiza cadastroalunos
app.get("/cadastro", (req, res)=>{
    res.render("cadastro");
})

//Router guardar no banco
app.post("/cadastro", (req, res)=>{
    let aluno = new Alunos();// criando objeto do tipo aluno
    aluno.nome = req.body.nome;
    aluno.nota1 = req.body.nota1;
    aluno.nota2 = req.body.nota2;
    aluno.nota3 = req.body.nota3;
    aluno.media = (aluno.nota1 + aluno.nota2 + aluno.nota3)/3;
    
    aluno.save((err)=>{
        if(err){
            return res.status(500).send("Erro ao cadastrar!")
        }
        else{
            return res.redirect("/boletim")
        }
    })
})

//Definindo a porta que a aplicação está rodando
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
