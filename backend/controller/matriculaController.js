const Matricula = require("../model/entidades/matricula.js");
const matriculaModel = new Matricula();

class MatriculaController {

    async getAll(req, res) {
        try {
            const result = await matriculaModel.getAll();
            return res.status(200).json(result);
        } catch (error) {
            console.log('Erro ao consultar Matrículas: ' + error);
            res.status(500).json({ error: 'Ocorreu um erro ao consultar as Matrículas!' });
        }
    }

    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await matriculaModel.getByCodigo(codigo);
            if (result) {
                return res.status(200).json(result);
            } else {
                res.status(500).json({ error: 'Nenhuma Matrícula foi localizada com esse código' });
            }
        } catch (error) {
            console.log('Erro ao consultar Matrícula: ' + error);
            res.status(500).json({ error: 'Ocorreu um erro ao consultar a Matrícula!' });
        }
    }

    async create(req, res) {
        const dados = req.body;
        const codigo_aluno = dados.codigo_aluno;
        const codigo_turma = dados.codigo_turma;
        const data_matricula = dados.data_matricula;
        const transferencia = dados.transferencia;
        // Demais campos da matrícula

        if (codigo_aluno && codigo_turma && data_matricula && transferencia) {
            try {
                const result = await matriculaModel.create(codigo_aluno, codigo_turma, data_matricula, transferencia);
                if (result) {
                    return res.status(201).json({ mensagem: 'Matrícula cadastrada com sucesso' });
                }
            } catch (error) {
                console.log('Erro ao cadastrar a nova Matrícula: ' + error);
                res.status(500).json({
                    erro: "Internal Server Error",
                    mensagem: 'Ocorreu um erro ao cadastrar a Matrícula!'
                });
            }
        } else {
            res.status(400).json({
                erro: "Bad Request",
                mensagem: 'Informe todos os campos obrigatórios'
            });
        }
    }


    async delete(req, res) {
        const codigo_aluno = req.params.codigo_aluno;
        const codigo_turma = req.params.codigo_turma;
        if (codigo_aluno && codigo_turma) {
            try {
                const result = await matriculaModel.delete(codigo_aluno, codigo_turma);
                if (result) {
                    return res.status(200).json({ mensagem: 'Matrícula apagada com sucesso' });
                }
            } catch (error) {
                console.log('Erro ao deletar a Matrícula: ' + error);
                res.status(500).json({
                    erro: "Internal Server Error",
                    mensagem: 'Ocorreu um erro ao deletar a Matrícula!'
                });
            }
        } else {
            res.status(400).json({
                erro: "Bad Request",
                mensagem: 'Informe o código do Aluno e da Turma'
            });
        }
    }
}

module.exports = MatriculaController;