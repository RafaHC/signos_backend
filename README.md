# Backend dos Signos

## Descrição

  Backend para o App dos SIGNOS, onde você consegue cadastrar,listar e excluir seus signos e ascendentes, com sistema de login, 
  protegido com JWT, senha criptografada com bcrypt.
  
  ### Váriaveis de ambiente
      SECRET_KEY: defina sua chave secreta que será usada na autenyicação com JWT.
      DATABASE_URL: defina sua conexão do BD postgreSQL e rode as querys que está na pasta sql, com o nome tables.sql. 

## Instalação

Basta clonar o projeto e rodar o comando
```bash
$ npm install 
```

Para rodar os testes na sua maquina instale o mocha globalmente
```js
npm install --global mocha
```

Abra um terminal e inicie o servidor.

Abra outro terminal e execute o comando npm test.

## Etapas do desenvolvimento

– Criar Tabelas. OK

Apis:
- Configurar express, body-parser - OK
- Configurar a conexao ao banco PostgreSQL com sequelize -OK
- Configurar Jwt - OK
- Criar Model Usuarios - OK
- Criar Usuariosctrl:
          - Cadastro, criptografia de senha(bcrypt), Login, compara senha criptografada e devolve o token, implementar test no projeto - 
- Criar model Signo - OK
- Criar SignoCtrl: Cadastrar signo, Listar Signos, Deletar Signo	
- Criar model AscendenteCtrl: Cadastrar Ascendente, Listar Ascendentes, Deletar Ascendente	
- Testar todas as rotas do  SignoCtrl - OK
- Testar todas as rotas do Usuarioctrl - OK
- Testar todas as rotas do  AscendenteCtrl - OK	
- Implementar socket.io no cadastro de signos e ascendentes. - OK

- Implementar o express-validator - OK


  
