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

-- (Rode isso APÓS criar a conta no site)
-- ---------------------------------------------------------

-- Pega automaticamente o ID do único usuário que você criou
SET @id_usuario = (SELECT id FROM utilizador LIMIT 1);

-- 1. INSERE PRODUTOS
INSERT INTO produto (nome, categoria, preco, quantidade, utilizadorId) VALUES 
('Picanha Maturada (kg)', 'Açougue', 89.90, 5, @id_usuario), -- Alerta
('Coca-Cola 2L', 'Bebidas', 10.00, 12, @id_usuario),        -- Alerta
('Leite Integral', 'Frios e Laticínios', 4.89, 15, @id_usuario), -- Alerta
('Arroz Tio João 5kg', 'Mercearia', 26.90, 50, @id_usuario),
('Feijão Carioca 1kg', 'Mercearia', 7.50, 40, @id_usuario),
('Detergente Ypê', 'Limpeza', 2.50, 100, @id_usuario),
('Sabão em Pó Omo', 'Limpeza', 14.90, 30, @id_usuario),
('Heineken Long Neck', 'Bebidas', 6.90, 120, @id_usuario),
('Ração Golden 15kg', 'Pet Shop', 145.00, 22, @id_usuario),
('Chocolate Lacta', 'Bomboniere', 7.50, 45, @id_usuario);

-- 2. INSERE VENDAS (Datas retroativas para gerar Gráfico)
INSERT INTO pedido (nomeCliente, nomeProduto, produtoId, quantidade, valorTotal, formaPagamento, status, dataPedido, utilizadorId) VALUES
-- Hoje
('Consumidor Final', 'Coca-Cola 2L', 2, 2, 20.00, 'Dinheiro', 'Concluido', NOW(), @id_usuario),
-- Ontem
('João Pedreiro', 'Heineken Long Neck', 6, 6, 41.40, 'Crédito', 'Concluido', DATE_SUB(NOW(), INTERVAL 1 DAY), @id_usuario),
-- 2 Dias atrás
('Seu Carlos', 'Ração Golden 15kg', 9, 1, 145.00, 'Débito', 'Concluido', DATE_SUB(NOW(), INTERVAL 2 DAY), @id_usuario),
-- 3 Dias atrás
('Consumidor Final', 'Arroz Tio João 5kg', 4, 2, 53.80, 'Dinheiro', 'Concluido', DATE_SUB(NOW(), INTERVAL 3 DAY), @id_usuario),
-- 4 Dias atrás
('Ana Paula', 'Chocolate Lacta', 10, 4, 30.00, 'PIX', 'Concluido', DATE_SUB(NOW(), INTERVAL 4 DAY), @id_usuario);
