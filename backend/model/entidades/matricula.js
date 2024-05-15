const DataBase = require('../database');
const banco = new DataBase();

class Matricula {
    #codigo_aluno;
    #codigo_turma;
    #data_matricula;
    #transferencia;
    #certidao_nascimento;
    #cpf_pais;
    #rg_pais;
    #documento_identidade_pais;
    #cartao_vacinacao;
    #formulario_inscricao;
    #comprovante_renda;
    #fotos_3x4;
    #historico_escolar;
    #cartao_vacinacao_aluno;
    #cns_sus;

    constructor(codigo_aluno, codigo_turma, data_matricula, transferencia, certidao_nascimento, cpf_pais, rg_pais, documento_identidade_pais, cartao_vacinacao, formulario_inscricao, comprovante_renda, fotos_3x4, historico_escolar, cartao_vacinacao_aluno, cns_sus) {
        this.#codigo_aluno = codigo_aluno;
        this.#codigo_turma = codigo_turma;
        this.#data_matricula = data_matricula;
        this.#transferencia = transferencia;
        this.#certidao_nascimento = certidao_nascimento;
        this.#cpf_pais = cpf_pais;
        this.#rg_pais = rg_pais;
        this.#documento_identidade_pais = documento_identidade_pais;
        this.#cartao_vacinacao = cartao_vacinacao;
        this.#formulario_inscricao = formulario_inscricao;
        this.#comprovante_renda = comprovante_renda;
        this.#fotos_3x4 = fotos_3x4;
        this.#historico_escolar = historico_escolar;
        this.#cartao_vacinacao_aluno = cartao_vacinacao_aluno;
        this.#cns_sus = cns_sus;
    }

    async create() {
        const result = await banco.ExecutaComandoNonQuery(`
            INSERT INTO matricula (codigo_aluno, codigo_turma, data_matricula, transferencia, certidao_nascimento, cpf_pais, rg_pais, documento_identidade_pais, cartao_vacinacao, formulario_inscricao, comprovante_renda, fotos_3x4, historico_escolar, cartao_vacinacao_aluno, cns_sus)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [this.#codigo_aluno, this.#codigo_turma, this.#data_matricula, this.#transferencia, this.#certidao_nascimento, this.#cpf_pais, this.#rg_pais, this.#documento_identidade_pais, this.#cartao_vacinacao, this.#formulario_inscricao, this.#comprovante_renda, this.#fotos_3x4, this.#historico_escolar, this.#cartao_vacinacao_aluno, this.#cns_sus]);
        return result;
    }


    async getAll() {
        try {
            const result = await banco.ExecutaComando(`SELECT * FROM matricula;`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getByCodigo(codigo_aluno) {
        try {
            const result = await banco.ExecutaComando(`SELECT * FROM matricula WHERE codigo_aluno = ?;`, [codigo_aluno]);
            return result;
        } catch (error) {
            throw error;
        }
    }



    async delete(codigo_aluno, codigo_turma) {
        const result = await banco.ExecutaComandoNonQuery('DELETE FROM matricula WHERE codigo_aluno = ? AND codigo_turma = ?;', [codigo_aluno, codigo_turma]);
        return result;
    }
}

module.exports = Matricula;