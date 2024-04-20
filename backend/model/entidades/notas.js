const DataBase = require('../database');
const Aluno = require('./aluno');
const banco = new DataBase();


 class Notas{
    #nota_id 
    #aluno_cpf;
    #turma_codigo;
    #disciplina_codigo ;
    #valor_nota;
    #data_avaliacao;
    #tipo_avaliacao;
    #peso_avaliacao;
    #observacao;
    
    constructor(NotaId, Aluno_cpf, Turma_Codigo, Disciplina_codigo, Valor_Nota, Data_avaliacao, Tipo_avaliacao, Peso_avaliacao, Observacao  ){
      
        this.#nota_id = NotaId;
        this.#aluno_cpf = Aluno_cpf;
        this.#turma_codigo = Turma_Codigo;
        this.#disciplina_codigo = Disciplina_codigo;
        this.#valor_nota = Valor_Nota;
        this.#data_avaliacao = Data_avaliacao;
        this.#tipo_avaliacao = Tipo_avaliacao;
        this.#peso_avaliacao = Peso_avaliacao;
        this.#observacao = Observacao;
    }

    async getAll(){
        const notas = await banco.ExecutaComando(`
        SELECT n.id,
               a.nome AS nome_aluno,
               a.cpf AS cpf_aluno,
               t.descricao AS descricao_turma,
               d.nome AS nome_disciplina,
               n.valor_nota,
               n.data_avaliacao,
               n.tipo_avaliacao,
               n.peso_avaliacao,
               n.observacao
        FROM notas AS n
        INNER JOIN Aluno AS a ON n.aluno_cpf = a.cpf
        INNER JOIN turma AS t ON n.turma_codigo = t.codigo
        INNER JOIN disciplinas AS d ON n.disciplina_codigo = d.codigo;`);
        
        return notas;
    }

    async getByCpf(cpf){
        const result = await banco.ExecutaComando(`SELECT n.id,
                                                        a.nome AS nome_aluno,
                                                        a.cpf AS cpf_aluno,
                                                        t.descricao AS descricao_turma,
                                                        d.nome AS nome_disciplina,
                                                        n.valor_nota,
                                                        n.data_avaliacao,
                                                        n.tipo_avaliacao,
                                                        n.peso_avaliacao,
                                                        n.observacao
                                                        FROM notas AS n
                                                        INNER JOIN Aluno AS a ON n.aluno_cpf = a.cpf
                                                        INNER JOIN turma AS t ON n.turma_codigo = t.codigo
                                                        INNER JOIN disciplinas AS d ON n.disciplina_codigo = d.codigo WHERE a.cpf = ?`,[cpf])
        if(result.length > 0)
        return true;
    else{
        return false;
    }
    }
          /**pesquisa por nome**/
    async getByNome (nome){
        var sql = `     SELECT n.id,
                                a.nome AS nome_aluno,
                                a.cpf AS cpf_aluno,
                                t.descricao AS descricao_turma,
                                d.nome AS nome_disciplina,
                                n.valor_nota,
                                n.data_avaliacao,
                                n.tipo_avaliacao,
                                n.peso_avaliacao,
                                n.observacao
                                FROM notas AS n
                                INNER JOIN Aluno AS a ON n.aluno_cpf = a.cpf
                                INNER JOIN turma AS t ON n.turma_codigo = t.codigo
                                INNER JOIN disciplinas AS d ON n.disciplina_codigo = d.codigo 
                        WHERE a.nome like '%${nome}%'`;
    const result = await banco.ExecutaComando(sql);
    return result;
    }


   
    async validarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');
    
        // Verificar se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
    
        // Verificar se todos os dígitos são iguais, o que torna o CPF inválido
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
    
        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;
    
        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;
    
        // Verificar se os dígitos verificadores calculados são iguais aos dígitos reais
        return (parseInt(cpf.charAt(9)) === digitoVerificador1 && parseInt(cpf.charAt(10)) === digitoVerificador2);
    }

    async buscarCpf(cpf){
        const result = await banco.ExecutaComando(`SELECT n.id,
        a.nome AS nome_aluno,
        a.cpf AS cpf_aluno,
        t.descricao AS descricao_turma,
        d.nome AS nome_disciplina,
        n.valor_nota,
        n.data_avaliacao,
        n.tipo_avaliacao,
        n.peso_avaliacao,
        n.observacao
        FROM notas AS n
        INNER JOIN Aluno AS a ON n.aluno_cpf = a.cpf
        INNER JOIN turma AS t ON n.turma_codigo = t.codigo
        INNER JOIN disciplinas AS d ON n.disciplina_codigo = d.codigo 
        WHERE a.cpf = ?`,[cpf])
        const notas = result[0];
        return notas;
    }

    async updateAluno(Aluno_cpf, Turma_Codigo, Disciplina_codigo, Valor_Nota, Data_avaliacao, Tipo_avaliacao, Peso_avaliacao, Observacao){
            
            const result = await banco.ExecutaComandoNonQuery(`
            UPDATE notas
            SET aluno_cpf = ?,
                turma_codigo = ?,
                disciplina_codigo = ?,
                valor_nota = ?,
                data_avaliacao = ?,
                tipo_avaliacao = ?,
                peso_avaliacao = ?,
                observacao = ?
            WHERE id = ?`,
            [Aluno_cpf,Turma_Codigo,Disciplina_codigo,Valor_Nota,Data_avaliacao,Tipo_avaliacao,Peso_avaliacao,Observacao]);
            return result;
    }

    async insertNotas(Aluno_cpf, Turma_Codigo, Disciplina_codigo, Valor_Nota, Data_avaliacao, Tipo_avaliacao, Peso_avaliacao, Observacao){
        const result = await banco.ExecutaComandoNonQuery(`INSERT INTO notas (aluno_cpf, turma_codigo, disciplina_codigo, valor_nota, data_avaliacao, tipo_avaliacao, peso_avaliacao, observacao)
                                                         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [Aluno_cpf,Turma_Codigo,Disciplina_codigo,Valor_Nota,Data_avaliacao,Tipo_avaliacao,Peso_avaliacao,Observacao]);
            return result;
    }


    async deleteAluno(cpf){
        const result = await banco.ExecutaComandoNonQuery('delete from aluno where cpf= ?',[cpf]);

        return result;
    }







}

module.exports = Notas;