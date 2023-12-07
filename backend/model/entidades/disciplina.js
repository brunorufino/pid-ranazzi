const Database = require('../database')

const banco = new Database()

class Disciplina{
    nome
    codigo
    carga_horaria
    observacao

    constructor(nome,codigo,carga,obs){
        this.nome = nome
        this.codigo = codigo
        this.carga_horaria = carga
        this.observacao = obs
    }

    async getAll(){
        const disciplinas = await banco.ExecutaComando('select * from disciplinas')
        return disciplinas
    }

    async getById(codigo){
        const result = await banco.ExecutaComando('select * from disciplinas WHERE codigo = ?', [codigo])
        const disciplina = result[0]
        return disciplina
    }

    async getByNome(nome){
        const result = await banco.ExecutaComando(`select * from disciplinas WHERE nome LIKE '%${nome}%'`)
        return result
    }

    async update(dados,codigo){
        let nome = dados.nome
        let carga = dados.carga
        let observacao = dados.observacao
        await banco.ExecutaComando('update disciplinas set nome = ?, carga = ?, observacao = ? where codigo = ?', [nome, carga, observacao, codigo])

    }

    async delete(codigo){
        await banco.ExecutaComandoNonQuery('delete from disciplinas WHERE codigo = ?',[codigo])
    }

    async create(dados){
        let nome = dados.nome
        let carga = dados.carga
        let observacao = dados.observacao
        
        await banco.ExecutaComandoNonQuery('insert into disciplinas (nome,carga,observacao) values (?,?,?)',[nome,carga,observacao])
    }
}

module.exports = Disciplina