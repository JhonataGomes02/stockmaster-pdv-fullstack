CREATE DATABASE repositorio_db;
USE repositorio_db;

CREATE TABLE utilizador (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  quantidade INT NOT NULL,
  utilizadorId INT,
  FOREIGN KEY (utilizadorId) REFERENCES utilizador(id) ON DELETE CASCADE
);

CREATE TABLE pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeCliente VARCHAR(255) NOT NULL,
  nomeProduto VARCHAR(255) NOT NULL,
  produtoId INT NOT NULL,
  quantidade INT NOT NULL,
  valorTotal DECIMAL(10, 2) NOT NULL,
  formaPagamento VARCHAR(255) DEFAULT 'Dinheiro',
  status VARCHAR(255) DEFAULT 'Concluido',
  dataPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  utilizadorId INT,
  FOREIGN KEY (utilizadorId) REFERENCES utilizador(id) ON DELETE CASCADE
);