DROP database supermercados;

create database supermercados;

USE supermercados;

DROP TABLE IF EXISTS fornecedores CASCADE;

DROP TABLE IF EXISTS cargos CASCADE;

DROP TABLE IF EXISTS vendas CASCADE;

DROP TABLE IF EXISTS clientes CASCADE;

DROP TABLE IF EXISTS produtos CASCADE;

DROP TABLE IF EXISTS setores CASCADE;

CREATE TABLE IF NOT EXISTS cargos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS setores (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS fornecedores(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cnpj VARCHAR(30) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    UNIQUE (email),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS volumes (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

 CREATE TABLE IF NOT EXISTS produtos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    volume_id INT,
    fornecedor_id INT,
    setor_id INT,   
    preco FLOAT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    PRIMARY KEY(id),
    FOREIGN KEY(setor_id) REFERENCES setores(id),
    FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id),
    FOREIGN KEY(volume_id) REFERENCES volumes(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT NOT NULL AUTO_INCREMENT,
    cpf VARCHAR(30) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    UNIQUE (cpf),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS funcionarios(
    id INT NOT NULL AUTO_INCREMENT,
    cpf VARCHAR(30) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    matricula VARCHAR(12) NOT NULL,
    setor_id INT,
    cargo_id INT,
    UNIQUE (cpf),
    PRIMARY KEY(id),
    FOREIGN KEY(setor_id) REFERENCES setores(id),
    FOREIGN KEY(cargo_id) REFERENCES cargos(id)
);

CREATE TABLE IF NOT EXISTS vendas (
    id INT NOT NULL AUTO_INCREMENT,
    nf VARCHAR(50),
    total FLOAT NOT NULL,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    datahora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(cliente_id) REFERENCES clientes(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS compras (
    id INT NOT NULL AUTO_INCREMENT,
    nf VARCHAR(50),
    total FLOAT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    datahora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

INSERT INTO
    cargos(nome)
values
('Gerente'),
('Auxiliar'),
('Caixa'),
('Vendedor'),
('Estoquista'),
('Repositor'),
('Açougueiro');

INSERT INTO
    setores(nome)
values
('Guiche'),
('Açougue'),
('Armazem'),
('Gerência');

INSERT INTO 
	volumes(nome)
values
('Peça'),
('Lote'),
('Lata'),
('Saco'),
('Pacote'),
('Unidade'),
('Caixa');
    
INSERT INTO
    fornecedores(nome, cnpj, telefone, email)
values
('Queijos e C&A', '12121/00001-00', '8599563107', 'exemplo1@exemplo.com'),
('Babado de Vaca', '78121/00001-01', '8596215407', 'exemplo2@exemplo.com'),
('Tapioca de Deus', '125654/00001-00', '8596258107', 'exemplo3@exemplo.com'),
('Topifaive', '15521/00001-00', '8592853107', 'exemplo4@exemplo.com');

INSERT INTO
    produtos(nome, volume_id, fornecedor_id, setor_id, preco)
values
('Arroz', 5, 1, 3, 4.50),
('Feijão', 5, 1, 3, 5.50),
('Café', 5, 1, 3, 3.50),
('Azeite', 3, 3, 3, 7.80),
('Açúcar', 5, 4, 3, 4.50);


INSERT INTO
    clientes(cpf, nome, telefone, email)
values
('45632180358', 'José Joaquim', '8566215487', 'exemplo9@exemplo.com'),
('45632180357', 'Maria Joaquina', '5622354872', 'exemplo8@exemplo.com'),
('45631280358', 'Patrícia Silva', '2155698562', 'exemplo7@exemplo.com'),
('45321080358', 'Iolanda Pozon', '5422369523', 'exemplo6@exemplo.com');





INSERT INTO
    funcionarios(cpf, nome, matricula, setor_id, cargo_id)
values
(25665487230, 'Manuel Pereira', 'AAA2235', 4, 1),
(45885652145, 'Maria da Silva', 'BBB2235', 4, 2),
(65666932012, 'Mariroca da Silva', 'BBB1135', 1, 3);


