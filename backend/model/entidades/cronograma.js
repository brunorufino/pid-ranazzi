const DataBase = require('../database')

const banco = new DataBase()

 class Cronograma {

     #disc_codigo;
     #tur_codigo;
     #data;
     #horario;

     constructor(codigo_disciplina, codigo_turma, dataAtual, horarioAtual){
        this.#disc_codigo = codigo_disciplina;
        this.#tur_codigo = codigo_turma;
        this.#data = dataAtual;
        this.#horario = horarioAtual;
     }

     async gravar(codigo_disc,codigo_turma,data,horario){

        const result =  await banco.ExecutaComandoNonQuery('insert into cronograma (disc_codigo,tur_codigo,cro_data,horario) values (?,?,?,?)',[codigo_disc,codigo_turma,data,horario])
        return result;
     }

     async update(codigo_disc,codigo_turma,data,horario){
      
 
        const result =  await banco.ExecutaComandoNonQuery("update cronograma set cro_data = SET cro_data = STR_TO_DATE('?', '%Y-%m-%d'), horario = ?  WHERE disc_codigo = ? and  tur_codigo = ? ",[data,horario,codigo_disc,codigo_turma])
        
        return result;
     }

     async delete(codigo_disc,codigo_turma){
        const result = await banco.ExecutaComandoNonQuery('delete from cronograma WHERE disc_codigo = ? and tur_codigo = ?',[codigo_disc,codigo_turma])
        return result;
    }

    async getAll(){
      const result = await banco.ExecutaComando(`SELECT cro.disc_codigo, cro.tur_codigo, DATE_FORMAT(cro.cro_data, '%d/%m/%Y') AS data_formatada,  TIME_FORMAT(cro.horario, '%H:%i') AS hora_formatada, tur.descricao AS turma_descricao, dis.nome AS disciplina_nome, tur.anoTurma, tur.qtde, dis.observacao FROM cronograma AS cro INNER JOIN turma AS tur ON cro.tur_codigo = tur.codigo INNER JOIN disciplinas AS dis ON cro.disc_codigo = dis.codigo;`)
     
                                                   return result;
     }

}

module.exports = Cronograma