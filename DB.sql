CREATE DATABASE "consomeAPI"
ENCODING = 'UTF8'
TEMPLATE = 'template0'
CONNECTION LIMIT -1


CREATE TABLE produtos(
codigo		INTEGER,
nome		VARCHAR(100),
telefone	INTEGER,
cep		INTEGER,
valor		INTEGER
);

SELECT * 
FROM produtos;

DROP TABLE produtos