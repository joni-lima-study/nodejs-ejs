USE supermercados;

DROP TABLE fornecedores;

DROP TABLE funcionarios;

DROP TABLE cargos;

DROP TABLE vendas;

DROP TABLE clientes;

DROP TABLE produtos;

DROP TABLE setores;

CREATE TABLE IF NOT EXISTS cargos(
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nome_cargo VARCHAR(30) NOT NULL,
    PRIMARY KEY(id_cargo)
);

CREATE TABLE IF NOT EXISTS setores(
    id_setor INT NOT NULL AUTO_INCREMENT,
    nome_setor VARCHAR(10) NOT NULL,
    PRIMARY KEY(id_setor)
);

CREATE TABLE IF NOT EXISTS produtos(
    id_produto INT NOT NULL AUTO_INCREMENT,
    nome_prod VARCHAR(50) NOT NULL,
    volume_prod VARCHAR(10) NOT NULL,
    estoque_prod INT NOT NULL,
    setor_prod INT,
    PRIMARY KEY(id_produto),
    FOREIGN KEY(setor_prod) REFERENCES setores(id_setor)
);

CREATE TABLE IF NOT EXISTS clientes(
    id_cliente INT NOT NULL AUTO_INCREMENT,
    cpf_cliente VARCHAR(30) NOT NULL,
    nome_cliente VARCHAR(50) NOT NULL,
    UNIQUE (cpf_cliente),
    PRIMARY KEY(id_cliente)
);

CREATE TABLE IF NOT EXISTS fornecedores(
    id_forn INT NOT NULL AUTO_INCREMENT,
    nome_forn VARCHAR(50) NOT NULL,
    cnpj_forn VARCHAR(30) NOT NULL,
    prod_forn INT,
    FOREIGN KEY(prod_forn) REFERENCES produtos(id_produto),
    PRIMARY KEY(id_forn)
);


CREATE TABLE IF NOT EXISTS funcionarios(
    id_func INT NOT NULL AUTO_INCREMENT,
    cpf_func VARCHAR(30) NOT NULL,
    nome_func VARCHAR(50) NOT NULL,
    mat_func VARCHAR(12) NOT NULL,
    setor_func INT,
    cargo_func INT,
    UNIQUE (cpf_func),
    PRIMARY KEY(id_func),
    FOREIGN KEY(setor_func) REFERENCES setores(id_setor),
    FOREIGN KEY(cargo_func) REFERENCES cargos(id_cargo)
);

CREATE TABLE IF NOT EXISTS vendas(
    id_venda INT NOT NULL AUTO_INCREMENT,
    total_venda FLOAT NOT NULL,
    venda_id_cliente INT NOT NULL,
    venda_id_produto INT NOT NULL,
    PRIMARY KEY(id_venda),
    FOREIGN KEY(venda_id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY(venda_id_produto) REFERENCES produtos(id_produto)
);

INSERT INTO
    cargos(nome_cargo)
values
('Gerente'),
('Auxiliar'),
('Caixa'),
('Vendedor'),
('Estoquista'),
('Repositor'),
('Açougueiro');

INSERT INTO
    setores(nome_setor)
values
('Guiche'),
('Açougue'),
('Estoque'),
('Gerencia');

INSERT INTO
    produtos(nome_prod, volume_prod, estoque_prod, setor_prod)
values
('Arroz', '1kg', 1000, 3),
('Feijão', '1kg', 1000, 3),
('Café', '1Pk', 700, 3),
('Azeite', '1l', 50, 3),
('Açúcar', '1kg', 60, 3);

INSERT INTO
    clientes(cpf_cliente, nome_cliente)
values
('45632180358', 'José Joaquim'),
('45632180357', 'Maria Joaquina'),
('45631280358', 'Patrícia Silva'),
('45321080358', 'Iolanda Pozon');


INSERT INTO
    fornecedores(nome_forn, cnpj_forn)
values
('Queijos e C&A', '12121/00001-00'),
('Babado de Vaca', '78121/00001-01'),
('Tapioca de Deus', '125654/00001-00'),
('Topifaive', '15521/00001-00');


INSERT INTO
    funcionarios(cpf_func, nome_func, mat_func, setor_func, cargo_func)
values
(25665487230, 'Manuel Pereira', 'AAA2235', 4, 1),
(45885652145, 'Maria da Silva', 'BBB2235', 4, 2),
(65666932012, 'Mariroca da Silva', 'BBB1135', 1, 3);

INSERT INTO
    vendas(total_venda, venda_id_cliente, venda_id_produto)
values
(70.50, 1, 1),
(7.50, 2, 1),
(45.50, 3, 1),
(60.50, 4, 1);

