# Sequelize

## Configuração básica

> Todo o código deste projeto ficaria dentro da pasta `src` (source), e na pasta root apenas arquivos de configurações básicos;

### Variáveis de ambiente

Na raíz do meu projeto existe um arquivo .env que possui dados sensíveis necessários no ambiente de minha aplicação. Estas variáveis são acessadas através de `process.env.<NOMEVARIAVEL>`.

`src/database/config/credentials.js`

```js
require("dotenv/config");

module.exports = {
  host: "localhost",
  port: process.env.PORT,
  password: process.env.PASSWORD,
  username: process.env.USER_NAME,
  database: "NodeSequelize",
  dialect: "postgres",
  define: {
    underscored: true,
    underscoredAll: true,
    timestamp: true,
  },
};
```

**O pacote `dotenv` não é necessário na configuração, ele apenas é o interpretador para se utilizar as variáveis de ambiente.**
<br><br>

- `host`: Host onde o banco de dados está localizado. Neste caso, o banco de dados está sendo executado localmente, portanto "localhost";

- `port`: Define a porta a ser usada para se conectar ao banco de dados. A configuração da porta é feita dinamicamente através de variáveis de ambiente;

- `password`: Indica a senha a ser usada para autenticar a conexão com o banco de dados;

- `username`: Especifica o nome de usuário a ser usado para autenticar a conexão com o banco de dados;

- `database`: Indica o nome da base de dados a ser usado;

- `dialect`: Dialeto que o Sequelize usuará. Aqui, "postgres", indicando que o banco de dados é o PostgreSQL.

- `define`: Contém configurações para os modelos do Sequelize:
  - `underscored`: Indica se o Sequelize deve usar o estilo "underscored" para os nomes das colunas no banco de dados. Os nomes das colunas serão em letras minúsculas e separados por underscore;
  - `underscoredAll`: Indica se o estilo "underscored" é para os nomes de todas as colunas, incluindo atributos e campos relacionados;
  - `timestamp`: Indica se deve preencher automaticamente colunas `createdAt` e `updatedAt` aos modelos, permitindo rastrear a data de criação e atualização dos registros.

`.sequelizerc`

```js
const path = require("node:path");
module.exports = {
  config: path.resolve(__dirname, "src", "database", "config", "credentials.js"),
  "models-path": path.resolve(__dirname, "src", "database", "models"),
  "migrations-path": path.resolve(__dirname, "src", "database", "migrations"),
  "seeders-path": path.resolve(__dirname, "src", "database", "seeds"),
};
```

> Caso não esteja familiarizado com a biblioteca `path` do Node, dê uma lida no método `resolve()` para entender melhor, aqui: [ LINK ](https://github.com/Sir-Aguiar/node-file-manipulation/blob/master/README.md#resolve)

Este objeto possui os caminhos relevantes para facilitar a organização do código relacionado ao Sequelize, como:

- Arquivos de configuração;
- Diretório de modelos;
- Diretório de migrações;
- Diretório de seeders.

Permitindo localizar e usar esses arquivos adequadamente nas operações de banco de dados, em consultas, migrações e população inicial de dados.

- `config`: Caminho absoluto para o arquivo de configuração do Sequelize. Geralmente contém as informações de configuração do banco de dados, como host, porta, nome de usuário, senha, e outras coisas;

- `"models-path"`: Caminho para o diretório onde os modelos do Sequelize são armazenados. Modelos são responsáveis por definir a estrutura e os relacionamentos das tabelas do banco de dados;

- `"migrations-path"`: O diretório onde as migrações do Sequelize são armazenadas. Migrações são usadas para realizar alterações no esquema do banco de dados, como criar tabelas, adicionar colunas, de uma forma versionada;

- `"seeders-path"`: Diretório onde os seeders do Sequelize são armazenados. Os seeders são usados para preencher o banco de dados com dados de amostra ou iniciais.

## Conexão com o banco de dados

No nosso arquivo `src\database\database.js` ficará localizada a conexão com o banco de dados.

```js
const { Sequelize } = require("sequelize");
const credentials = require("../database/config/credentials");

const NodeSequelize = new Sequelize(credentials);

module.exports = NodeSequelize;
```

As importações feitas neste arquivo são de:

- `Sequelize`: A classe que permite a conexão com nosso banco de dados;
- `credentials`: Nosso objeto com as credenciais e configurações do nosso banco de dados.

Logo após importar é instanciado uma conexão com o banco, passando para o `constructor` as configurações. Então exportamos deste arquivo a nossa conexão para utilizá-la em outros módulos.

A classe `Sequelize` representa uma instância do Sequelize, é usada para configurar e estabelecer a conexão com o banco, definir modelos, realizar consultas e executar operações no banco de dados.
Oferece métodos e recursos adicionais para lidar com migrações de banco de dados, relacionamentos entre modelos, validação de dados, entre outros recursos avançados.

## Criando e gerenciando banco de dados

Até este momento sequer existe uma database NodeSequelize, aquela que especificamos acima.

Para iniciarmos o nosso banco de dados, rode no terminal `npx sequelize db:create`
Este comando irá criar nossa base de dados especificada no arquivo de configuração

## Migrations

As migrations são uma espécie de versionamento para nosso banco de dados.

`npx sequelize migration:create --name=create-users`

Este comando irá gerar uma migration no diretório especificado em `.sequelizerc`. O argumento --name recebe o nome que será atribuído ao arquivo desta migration, sendo precedido pelo timestamp de quando esta migration foi gerada.

O timestamp é essencial para as migrations, pois quando for necessário utilizar o código em outra máquina, por exemplo, é através delas que os bancos serão sincronizados. E as timestamps indicam a ordem para se executar as migrations.

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255), // 255 bytes are by default
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("users");
  },
};
```

Esta é a estrutura padrão de uma migration quando gerada. Os método `up()` é como se fosse um Ctrl+V já e `down()` seria o Ctrl+Z.

`up()` representa o que a migration realizará no banco de dados, como criar uma tabela, por exemplo.
> Para realizar as migrates, rode no terminal `npx sequelize db:migrate`

`down()` representa o que deve ser desfeito no banco de dados caso algo tenha dado errado ao rodar `up()`, como excluir uma tabela, por exemplo.
> Ao rodar `npx sequelize db:migrate:undo` vai desfazer a última migration realizada
