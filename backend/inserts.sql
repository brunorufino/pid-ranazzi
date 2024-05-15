

INSERT INTO `funcionario` (`nome`, `rg`, `cpf`, `dataNascimento`, `genero`, `rua`, `numero`, `cidade`, `estado`, `cep`, `email`, `telefone`, `codDepartamento`, `dataAdmissao`)
VALUES ('João Silva', '1234567890', '12345678901', '1990-01-01', 'Masculino', 'Rua A', 123, 'Cidade A', 'Estado A', '12345-678', 'joao@example.com', '1234567890', 1, '2020-01-01'),
       ('Maria Santos', '0987654321', '09876543210', '1985-05-15', 'Feminino', 'Rua B', 456, 'Cidade B', 'Estado B', '98765-432', 'maria@example.com', '9876543210', 2, '2018-03-15');
       
       
       INSERT INTO `turma` (`descricao`, `anoTurma`, `qtde`)
VALUES ('Turma A', '2024', 30),
       ('Turma B', '2024', 25);
       
       
       INSERT INTO `disciplinas` (`nome`, `carga`, `observacao`)
VALUES ('Matemática', '80h', 'Disciplina de matemática básica'),
       ('Português', '80h', 'Disciplina de língua portuguesa');
       
       
   INSERT INTO `Aluno` (`cpf`, `nome`, `rg`, `data_nasc`, `sexo`, `email`, `rua`, `numero`, `bairro`, `cep`, `cidade`, `nomerep`, `telefone`, `emailrep`)
VALUES ('12345678901', 'Pedro Oliveira', '9876543210', '2005-07-10', 'Masculino', 'pedro@example.com', 'Rua C', 789, 'Bairro A', '54321-098', 'Cidade C', 'Ana Oliveira', '987654321', 'ana@example.com'),
       ('09876543210', 'Ana Silva', '0123456789', '2006-02-20', 'Feminino', 'ana@example.com', 'Rua D', 987, 'Bairro B', '65432-109', 'Cidade D', 'José Silva', '987654321', 'jose@example.com');
       
       
       
   INSERT INTO `cronograma` (`disc_codigo`, `tur_codigo`, `cro_data`, `horario`)
VALUES (1, 1, '2024-01-10', '08:00-10:00'),
       (2, 1, '2024-01-10', '10:00-12:00'),
       (1, 2, '2024-01-10', '08:00-10:00'),
       (2, 2, '2024-01-10', '10:00-12:00');
       
       
INSERT INTO `matricula` (`codigo_aluno`, `codigo_turma`, `data_matricula`, `transferencia`, `certidao_nascimento`, `cpf_pais`, `rg_pais`, `documento_identidade_pais`, `cartao_vacinacao`, `formulario_inscricao`, `comprovante_renda`, `fotos_3x4`, `historico_escolar`, `cartao_vacinacao_aluno`, `cns_sus`)
VALUES ('12345678901', 1, '2024-01-05', 'não', 1, '98765432101', '7654321098', 1, 1, 1, 1, 1, 1, 1, '123456789012345'),
       ('09876543210', 2, '2024-01-05', 'não', 1, '01234567890', '5432109876', 1, 1, 1, 1, 1, 1, 1, '987654321098765');
       
       
INSERT INTO `notas` (`aluno_cpf`, `turma_codigo`, `disciplina_codigo`, `valor_nota`, `data_avaliacao`, `tipo_avaliacao`, `peso_avaliacao`, `observacao`)
VALUES ('12345678901', 1, 1, 7.5, '2024-02-15', 'Prova 1', 0.5, 'Nota da primeira prova'),
       ('12345678901', 1, 2, 8.0, '2024-02-20', 'Prova 1', 0.5, 'Nota da primeira prova'),
       ('12345678901', 1, 1, 8.0, '2024-03-15', 'Prova 2', 0.5, 'Nota da segunda prova'),
       ('12345678901', 1, 2, 7.8, '2024-03-20', 'Prova 2', 0.5, 'Nota da segunda prova');