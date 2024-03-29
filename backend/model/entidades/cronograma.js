const DataBase = require('../database')

const banco = new DataBase()

 class Cronograma {

     #disc_codigo;
     #tur_codigo;
     #data;

     constructor(codigo_disciplina, codigo_turma, dataAtual){
        this.#disc_codigo = codigo_disciplina;
        this.#tur_codigo = codigo_turma;
        this.#data = dataAtual;
     }

     async gravar(codigo_disc,codigo_turma,data){

        const result =  await banco.ExecutaComandoNonQuery('insert into cronograma (disc_codigo,tur_codigo,cro_data) values (?,?,?)',[codigo_disc,codigo_turma,data])
        return result;
     }

     async update(codigo_disc,codigo_turma,data){

        const result =  await banco.ExecutaComandoNonQuery('update cronograma set cro_data = ?  WHERE disc_codigo = ? and  tur_codigo = ? ',[data,codigo_disc,codigo_turma])
        return result;
     }

     async delete(codigo_disc,codigo_turma){
        const result = await banco.ExecutaComandoNonQuery('delete from cronograma WHERE disc_codigo = ? and tur_codigo = ?',[codigo_disc,codigo_turma])
        return result;
    }

    async getAll(){
      const result = await banco.ExecutaComando(`  SELECT * FROM cronograma AS cro
                                                   INNER JOIN turma AS tur ON cro.tur_codigo = tur.codigo
                                                   INNER JOIN disciplinas AS dis ON cro.disc_codigo = dis.codigo`)
     
                                                   return result;
     }

}

module.exports = Cronograma