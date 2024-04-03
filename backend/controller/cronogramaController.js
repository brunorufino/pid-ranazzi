const Cronograma = require("../model/entidades/cronograma");

const cronograma = new Cronograma()

class CronogramaController{

async create(req,res){
   

    const codigo_disc = req.body.disc_codigo;
    const codigo_turma = req.body.tur_codigo;
    const data =  req.body.data;
    const horario = req.body.horario;

    if(codigo_disc&&codigo_turma&&data&&horario){
       
        try {
            const result = await cronograma.gravar(codigo_disc,codigo_turma,data,horario);

                if(result){
                    return res.status(201).json({menssagem:'Horário cadastrado com sucesso'})
                }
        } catch (error) {
                console.log('Erro ao cadastrar a novo Horário:'+error);
                res.status(500).json({
                    erro:"Internal Server Error",
                    mensagem:'Ocorreu um erro ao cadastrar a Horário!'})
        }
    }
    else{
        res.status(400).json({
            erro: "Bad Request",
            mensagem:'Informe todos os campos obrigatórios'})
    }
}

async update(req,res){
   

    const codigo_disc = req.body.disc_codigo;
    const codigo_turma = req.body.tur_codigo;
    const data =  req.body.data;
    const horario = req.body.horario;

    console.log(req.body);

    if(codigo_disc&&codigo_turma&&data&&horario){
       
        try {
            const result = await cronograma.update(codigo_disc,codigo_turma,data,horario);

                if(result){
                    return res.status(201).json({menssagem:'Horário alterado com sucesso'})
                }
        } catch (error) {
                console.log('Erro ao alterar o Horário:'+error);
                res.status(500).json({
                    erro:"Internal Server Error",
                    mensagem:'Ocorreu um erro ao alterar a Horário!'})
        }
    }
    else{
        res.status(400).json({
            erro: "Bad Request",
            mensagem:'Informe todos os campos obrigatórios'})
    }
}

async delete(req,res){
    
    const codigo_disc = req.body.disc_codigo;
    const codigo_turma = req.body.tur_codigo;

    if(codigo_disc,codigo_turma){
        const result = await cronograma.delete(codigo_disc,codigo_turma);

        try {
            if(result){
                return res.status(200).json({menssagem:'Horário apagada com sucesso'})
            }
        } catch (error) {
           
        res.status(500).json({
        erro:"Internal Server Error",
        mensagem:'Ocorreu um erro ao deletar o cronograma!'})
        }
    }
    else{
        res.status(400).json({
        erro: "Bad Request",
        mensagem:'Informe o código da disciplina e da turma'})
    }
 }


 async getAll(req,res){

    try {
        const result = await cronograma.getAll()
        return res.status(200).json(result)
    } catch (error) {
        console.log('Erro ao consultar horários:'+error);
        res.status(500).json({error:'Ocorreu um erro ao consultar os horários!'})
    }
}

async getByName(req,res){

    const filtro = req.body.nome;
    console.log(filtro);
    try {
        const result = await cronograma.getByNome(filtro)
        if(result){
              return res.status(200).json(result)
        }
        else{
            res.status(404).json({error:'Nenhuma disciplina foi localizada com esse nome'})
        }
    } catch (error) {
        console.log('Erro ao consultar funcionário:'+error);
        res.status(500).json({error:'Nenhuma disciplina foi localizada com esse nome!'})
    }
}


}
module.exports = CronogramaController;