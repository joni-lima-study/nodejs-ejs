const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//permite user o moment no ejs
app.locals.moment = require('moment');

app.use(express.static("public"));

const produtos_router = require('./routers/produtos_router');
const compras_router = require('./routers/compras_router');
const vendas_router = require('./routers/vendas_router');
const home_router = require('./routers/home_router');
const fornecedores_router = require('./routers/fornecedores_router');
const clientes_router = require('./routers/clientes_router');


produtos_router.map(router);
compras_router.map(router);
vendas_router.map(router);
home_router.map(router);
fornecedores_router.map(router);
clientes_router.map(router);

app.use('/', router);

app.listen(port, ()=>{
    console.log(`Server started port ${port}`)
})
