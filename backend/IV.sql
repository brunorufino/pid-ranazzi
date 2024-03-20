CREATE TABLE funcionario (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    rg VARCHAR(20),
    cpf VARCHAR(14),
    dataNascimento DATE,
    genero VARCHAR(20),
    rua VARCHAR(255),
    numero INT,
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(10),
    email VARCHAR(255),
    telefone VARCHAR(20),
    codDepartamento INT,
    dataAdmissao DATE
);

CREATE TABLE turma(
     codigo INT AUTO_INCREMENT PRIMARY KEY,
     descricao VARCHAR(60),
     anoTurma VARCHAR(60),
     qtde INT
)

CREATE TABLE disciplinas (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    carga VARCHAR(3) NOT NULL,
    observacao VARCHAR(300)
);


CREATE TABLE Aluno (
    cpf VARCHAR(14) PRIMARY KEY,
    nome VARCHAR(255),
    rg VARCHAR(20),
    data_nasc DATE,
    sexo VARCHAR(20),
    email VARCHAR(255),
    rua VARCHAR(255),
    numero INT,
    bairro VARCHAR(40),
    cep VARCHAR(10),
    cidade VARCHAR(100),
    nomerep VARCHAR(255),
    telefone VARCHAR(20),
    emailrep VARCHAR(255)
);

CREATE TABLE cronograma (
    disc_codigo INT,
    tur_codigo INT,
    cro_data DATE,
    CONSTRAINT pk_disciplina FOREIGN KEY(disc_codigo) REFERENCES disciplinas(codigo),
    CONSTRAINT pk_turma FOREIGN KEY(tur_codigo) REFERENCES turma(codigo),
);