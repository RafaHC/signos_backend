CREATE TABLE usuarios (
    ID  SERIAL PRIMARY KEY,
    usuario varchar(20) not null,
    senha varchar(50) not null,
    email varchar(60),
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE signos (
   ID  SERIAL PRIMARY KEY,
   nome varchar(20) not null,
   data_inicio varchar(20) not null,
   data_fim varchar(20) not null,
   descricao varchar(480),
   usuarioid integer not null, 
   createdAt DATE,
   updatedAt DATE
);

CREATE TABLE ascendentes (
   ID  SERIAL PRIMARY KEY,
   nome varchar(20) not null,
   hora_inicio time not null,
   hora_fim time not null,
   descricao varchar(480),
   signoid integer not null, 
   createdAt DATE,
   updatedAt DATE
);