
const Turma = require("../model/entidades/turma");

const turma = new Turma()

class TurmaContoller{

    async getAll(req,res){

        try {
            const result = await turma.getAll()
            return res.status(200).json(result)
        } catch (error) {
            console.log('Erro ao consultar turma:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o turma!'})
        }
    }
    async getByCodigo(req,res){

        const codigo = req.params.codigo;

        try {
            const result = await turma.getByCodigo(codigo)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(500).json({error:'Nenhum turma foi localizado com esse código'})
            }
        } catch (error) {
            console.log('Erro ao consultar turma:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o turma!'})
        }
    }

   
    async create(req,res){
       

        const descricao = req.body.descricao;
        const anoTurma = req.body.anoTurma;
        const qtde =  req.body.qtde;
     

        if(descricao,anoTurma,qtde){
           
            try {
                const result = await turma.insertTurma(descricao,anoTurma,qtde);

                    if(result){
                        return res.status(201).json({menssagem:'Turma cadastrada com sucesso'})
                    }
            } catch (error) {
                    console.log('Erro ao cadastrar a nova turma:'+error);
                    res.status(500).json({
                        erro:"Internal Server Error",
                        mensagem:'Ocorreu um erro ao cadastrar a turma!'})
            }
        }
        else{
            res.status(400).json({
                erro: "Bad Request",
                mensagem:'Informe todos os campos obrigatórios'})
        }
    }

    async update(req,res){

        const codigo = req.body.codigo;
        const descricao = req.body.descricao;
        const anoTurma = req.body.anoTurma;
        const qtde =  req.body.qtde;
     

        if(descricao,anoTurma,qtde,codigo){
           
            try {
                const result = await turma.updateTurma(codigo,descricao,anoTurma,qtde);

                    if(result){
                        return res.status(201).json({menssagem:'Turma alterada com sucesso'})
                    }
            } catch (error) {
                    console.log('Erro ao alterada a nova turma:'+error);
                    res.status(500).json({
                        erro:"Internal Server Error",
                        mensagem:'Ocorreu um erro ao alterada a turma!'})
            }
        }
        else{
            res.status(400).json({
                erro: "Bad Request",
                mensagem:'Informe todos os campos obrigatórios'})
        }
     }

     async getByName(req,res){

        const filtro = req.body.nome;
        console.log(filtro);
        try {
            const result = await turma.getByNome(filtro)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(404).json({error:'Nenhum turma foi localizado com esse nome'})
            }
        } catch (error) {
            console.log('Erro ao consultar turma:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar a turma!'})
        }
    }

     async delete(req,res){
        const codigo = req.params.codigo;

        if(codigo){
            const result = await turma.deleteTurma(codigo);

            try {
                if(result){
                    return res.status(200).json({menssagem:'Turma apagada com sucesso'})
                }
            } catch (error) {
               
            res.status(500).json({
            erro:"Internal Server Error",
            mensagem:'Ocorreu um erro ao deletar o turma!'})
            }
        }
        else{
            res.status(400).json({
            erro: "Bad Request",
            mensagem:'Informe o código do turma'})
        }
     }
    
}

module.exports=TurmaContoller;