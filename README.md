# ATM Manager

Backend de sistema de auto-atentimento bancário

## 🚀 Começando

### 📋 Pré-requisitos

node 16+
Docker
KnexJs

Instalação do Knex JS de forma global

```
npm install -g knex
```
Ou 
```
yarn global add knex
```
Ou
```
npx knex
```

Criação do container Docker com imagem do Postgresql

```
docker run --name atm_manager_db -e POSTGRES_DB=atm_manager -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Acessando o banco de dados criado pelo docker atraves do DBeaver

-	crie uma nova conexão com o banco de dados postgresql
-	host: localhost
-	port: 5432
-	database: atm_manager
-	username: postgres
-	password: postgres

Para criar novas migrations utilize o comando abaixo

```
yarn migrate:make {nome-da-migration}
```


Para rodar as migrations utilize o comando abaixo

```
yarn migrate:run
```
