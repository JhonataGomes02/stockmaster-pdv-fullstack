# 🛒 StockMaster - PDV Fullstack

Sistema de gestão de estoque e vendas (PDV) desenvolvido como Trabalho de Conclusão de Curso (TCC). O projeto utiliza **NestJS** no Back-end, **Angular** no Front-end e **MySQL** como banco de dados.

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo na ordem exata para evitar erros.

### 📋 Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [MySQL](https://dev.mysql.com/downloads/installer/) (Server e Workbench)
* [Git](https://git-scm.com/)

---

Passo 1: Configurar o Banco de Dados (OBRIGATÓRIO)
Antes de iniciar as aplicações, você precisa criar o banco de dados.

1. Abra o seu **MySQL Workbench** ou terminal do MySQL.
2. Copie e execute o script SQL abaixo para criar a estrutura:

```sql
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
```
Passo 2: Iniciar o Back-end (API)
Abra um terminal no VS CODE e rode pelo prompt de comando na pasta api-repositorio.

Instale as dependências e rode o servidor:
npm install

Rodar o projeto:
npm run start

Passo 3: Iniciar o Front-end (Aplicação)
⚠️ Atenção: Devido a versões de dependências, utilize o comando abaixo para instalar.
Abra um novo terminal na pasta app-repositorio.
Execute os comandos:

# Instalar dependências (COMANDO IMPORTANTE)
npm install --legacy-peer-deps

# Rodar o projeto
npm start ou ng serve
Acesse no seu navegador: http://localhost:4200

🔐 Acesso ao Sistema
Como o banco de dados inicia vazio, siga o fluxo:

Clique em "Registrar" na tela inicial.

Crie uma nova conta (Ex: Nome da sua Loja, Email e Senha).

Faça o Login com as credenciais criadas.

🛠️ Tecnologias Utilizadas
Front-end: Angular + Angular Material

Back-end: NestJS + TypeORM

Banco de Dados: MySQL

Autenticação: JWT + Bcrypt

Developed by Jhonata Enzo S. Gomes © 2025
