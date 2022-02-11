var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://nigerio_bezerra:nigerio_bezerra@cluster0.pdhkp.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{
    console.log("Banco conectado!");
}).catch((err)=>{
    console.log("Deu ruim! " + err);
});