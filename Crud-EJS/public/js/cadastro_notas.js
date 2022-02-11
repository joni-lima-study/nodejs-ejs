// #region Validações
// PROGRESS BAR

function valida_nome(x) {

    var nome = x.value
    if (isNaN(nome)) {
        x.style.border = "2px solid green"

        return true;
    }

    else {

        x.style.border = "2px solid red"
        return false;
    }

}


function valida_nota1(x) {
    if (x.value == "") {

        x.style.border = "2px solid red"
        return false;
    }
    else {

        x.style.border = "2px solid green"

        return true;
    }
}
//9
function valida_nota2(x) {
    if (x.value == "") {

        x.style.border = "2px solid red"
        return false;
    }
    else {

        x.style.border = "2px solid green"

        return true;
    }
}

function valida_nota3(x) {
    if (x.value == "") {
        x.style.border = "2px solid red"
        return false;
    }
    else {
        x.style.border = "2px solid green"

        return true;
    }
}



// #region Máscaras e Cálculos

// INICIO FUNÇÃO DE MASCARA MAIUSCULA
function maiuscula(x) {
    v = (x.value.toUpperCase());
    x.value = v;

}
//FIM DA FUNÇÃO MASCARA MAIUSCULA



// #endregion

// #endregion


class Pessoa { //classe pessoa, todos os objetos pessoa seguirão esse modelo 

    constructor() {
        this.nome = ""; //no objeto pessoa(i) todos os this.variável vão receber o parametro na ordem do construtor 
        this.nota1 = "";
        this.nota2 = "";
        this.nota3 = "";

    }
    //Ola (nome ) , seu login é (email) , você tem (idade) se define como uma pessoa do sexo(sexo) e pode usar (CPF) como senha"
    mostrar_dados() {
        // return this.nome + " " + this.email + " " + this.data_nascimento + " " + this.cpf + " " + this.sexo + " " + this.idade
        // return `<h3>Olá ${this.nome},<h3><br>
        // <p>Seu login é ${this.email}, você tem ${this.idade} anos de idade, se define como uma pessoa ${this.sexo} e pode usar ${this.cpf} como senha. ${this.gravidez}</p>`
        return `

Nome: ${this.nome}<br>
Cpf: ${this.cpf}<br>
Telefone: ${this.telefone}<br>
Data: ${this.data_nascimento}<br>
Idade: ${this.idade}<br>
Profissao: ${this.profissao}<br>
Etnia: ${this.etnia}<br>
Email: ${this.email}<br>
Sexo: ${this.sexo}<br>
Grávidez: ${this.gravidez}<br>
Cartão SUS: ${this.cartao_sus}<br>
Peso: ${this.peso}<br>
Altura: ${this.altura}<br>
IMC: ${this.imc}<br>
Comorb: ${this.comorbidades}<br>
Alerg: ${this.alergias}<br>
Vacinas: ${this.vacinas}<br>

 
`
    }
}

function enviar_dados() {
    var nome_input = document.getElementById("nome"); //está recebendo dados do input
    var nota1_input = document.getElementById("nota1");
    var nota2_input = document.getElementById("nota2");
    var nota3_input = document.getElementById("nota3");


    var formValido = true;

    //validando todos os dados do input segundo as funções valida

    if (!valida_nome(nome_input)) {
        formValido = false;
    }

    if (!valida_nota1(nota1_input)) {
        formValido = false;
    }

    if (!valida_nota2(nota2_input)) {
        formValido = false;
    }

    if (!valida_nota3(nota3_input)) {
        formValido = false;
    }




    //se qualquer erro retorna falso e não envia o form

    if (!formValido) {
        //Função UI para caixa de diálogo.
        $(function () {
            // $("#dialog").dialog();
            $('#dialog_erro').alert().show()
            $('#dialog_sucesso').alert().hide()
        });

        // document.getElementById("print").innerHTML = "<h3>Dados Inválidos!</h3><br><p>Por favor, verifique os campos em vermelho e tente novamente.</p>"
        return formValido;
    }
    else {
        //mostrar div  do form válido em verde com os dados da pessoa
        var nome = nome_input.value.toUpperCase();
        var nota1 = nota1_input.value;
        var nota2 = nota2_input.value
        var nota3 = nota3_input.value;



        //variavél novo objeto - pessoa_1 está recebendo uma instância da classe pessoa tornando-se um objeto  (pessoa_1.nome, pessoa_1.email, etcccc)     
        var pessoa_1 = new Pessoa();
        pessoa_1.nome = nome;
        pessoa_1.nota1 = nota1;
        pessoa_1.nota2 = nota2;
        pessoa_1.nota3 = nota3;


        // document.getElementById("center").innerHTML = pessoa_1.mostrar_dados(); //imprimindo os dados se tudo estiver correto 
        $(function () {
            
            $('#dialog_erro').alert().hide();
            $('#dialog_sucesso').alert().show();
            $("form").submit();
            setInterval(function () {
                $("input").val("");
                $("textarea").val("");
            }, 500);
        });

        return true;
    }
}
