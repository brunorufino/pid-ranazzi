CREATE DATABASE IF NOT EXISTS `4termoranazzi`;
USE `4termoranazzi`;

CREATE TABLE IF NOT EXISTS `funcionario` (
    `codigo` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255),
    `rg` VARCHAR(20),
    `cpf` VARCHAR(14),
    `dataNascimento` DATE,
    `genero` VARCHAR(20),
    `rua` VARCHAR(255),
    `numero` INT,
    `cidade` VARCHAR(100),
    `estado` VARCHAR(50),
    `cep` VARCHAR(10),
    `email` VARCHAR(255),
    `telefone` VARCHAR(20),
    `codDepartamento` INT,
    `dataAdmissao` DATE
);

CREATE TABLE IF NOT EXISTS `turma` (
     `codigo` INT AUTO_INCREMENT PRIMARY KEY,
     `descricao` VARCHAR(60),
     `anoTurma` VARCHAR(60),
     `qtde` INT
);

CREATE TABLE IF NOT EXISTS `disciplinas` (
    `codigo` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(50) NOT NULL,
    `carga` VARCHAR(3) NOT NULL,
    `observacao` VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS `Aluno` (
    `cpf` VARCHAR(14) PRIMARY KEY,
    `nome` VARCHAR(255),
    `rg` VARCHAR(20),
    `data_nasc` DATE,
    `sexo` VARCHAR(20),
    `email` VARCHAR(255),
    `rua` VARCHAR(255),
    `numero` INT,
    `bairro` VARCHAR(40),
    `cep` VARCHAR(10),
    `cidade` VARCHAR(100),
    `nomerep` VARCHAR(255),
    `telefone` VARCHAR(20),
    `emailrep` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `cronograma` (
    `disc_codigo` INT,
    `tur_codigo` INT,
    `cro_data` DATE,
    `horario` VARCHAR(10),
    CONSTRAINT pk_disciplina FOREIGN KEY (`disc_codigo`) REFERENCES `disciplinas`(`codigo`),
    CONSTRAINT pk_turma FOREIGN KEY (`tur_codigo`) REFERENCES `turma`(`codigo`)
);

CREATE TABLE IF NOT EXISTS `matricula` (
    `codigo_aluno` VARCHAR(14),
    `codigo_turma` INT,
    `data_matricula` DATE,
    `transferencia` VARCHAR(3), -- Use VARCHAR em vez de ENUM
    `certidao_nascimento` BOOLEAN,
    `cpf_pais` VARCHAR(14),
    `rg_pais` VARCHAR(20),
    `documento_identidade_pais` BOOLEAN,
    `cartao_vacinacao` BOOLEAN,
    `formulario_inscricao` BOOLEAN,
    `comprovante_renda` BOOLEAN,
    `fotos_3x4` BOOLEAN,
    `historico_escolar` BOOLEAN,
    `cartao_vacinacao_aluno` BOOLEAN,
    `cns_sus` VARCHAR(15),
    CONSTRAINT pk_matricula PRIMARY KEY (`codigo_aluno`, `codigo_turma`),
    CONSTRAINT fk_aluno FOREIGN KEY (`codigo_aluno`) REFERENCES `Aluno`(`cpf`),
    CONSTRAINT fk_turma FOREIGN KEY (`codigo_turma`) REFERENCES `turma`(`codigo`)
);

CREATE TABLE IF NOT EXISTS `notas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `aluno_cpf` VARCHAR(14),
    `turma_codigo` INT,
    `disciplina_codigo` INT,
    `valor_nota` DECIMAL(5,2),
    `data_avaliacao` DATE,
    `tipo_avaliacao` VARCHAR(50),
    `peso_avaliacao` DECIMAL(5,2),
    `observacao` TEXT,
    CONSTRAINT fk_notas_aluno FOREIGN KEY (`aluno_cpf`) REFERENCES `Aluno`(`cpf`),
    CONSTRAINT fk_notas_turma FOREIGN KEY (`turma_codigo`) REFERENCES `turma`(`codigo`),
    CONSTRAINT fk_notas_disciplina FOREIGN KEY (`disciplina_codigo`) REFERENCES `disciplinas`(`codigo`)
) ENGINE=InnoDB;