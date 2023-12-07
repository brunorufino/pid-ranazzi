const DataBase = require('../database')
const banco = new DataBase()

class Turma {
    codigo;
    descricao;
    anoTurma;
    qtde;

    constructor(codigo,descricao,anoTurma,qtde){

           this.codigo=codigo;
           this.descricao =descricao;
           this.anoTurma=anoTurma;
           this.qtde =qtde;        
    }

    async getAll(){
  
        const turma = await banco.ExecutaComando(`select * from turma`);
        return turma;
    }
    
    async getByCodigo(codigo){
        const result = await banco.ExecutaComando('select * from turma where codigo= ?',[codigo])
        const turma = result[0];
        return turma;
    }

    async insertTurma(descricao,anoTurma,qtde){

        const result = await banco.ExecutaComandoNonQuery(`INSERT INTO turma 
        (descricao, anoTurma,qtde)VALUES (?,?,?)`,
        [descricao,anoTurma,qtde]);    
        return result;
    }


    async updateTurma(codigo,descricao,anoTurma,qtde){

            const result = await banco.ExecutaComandoNonQuery(`
            UPDATE turma 
            SET 
                descricao = ?,
                anoTurma = ?,
                qtde = ?
            WHERE codigo = ?`,
            [descricao,anoTurma,qtde,codigo]); 
            return result;
    }un

    async deleteTurma(codigo){
        const result = await banco.ExecutaComandoNonQuery('delete from turma where codigo= ?',[codigo]);
        return result;
    }

}
module.exports=Turma