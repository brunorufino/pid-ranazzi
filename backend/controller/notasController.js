
const Notas = require("../model/entidades/notas.js");

const nota = new  Notas()

class NotasContoller{

    async getAll(req,res){

        try {
            const result = await nota.getAll()
            return res.status(200).json(result)
        } catch (error) {
            console.log('Erro ao consultar Notas:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o Notas!'})
        }
    }
    async getByCodigo(req,res){

        const codigo = req.params.codigo;

        try {
            const result = await nota.getByCodigo(codigo)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(500).json({error:'Nenhum Notas foi localizado com esse código'})
            }
        } catch (error) {
            console.log('Erro ao consultar Notas:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o Notas!'})
        }
    }

   
    async create(req,res){
       
       const  dados = req.body;
       const  cpf_aluno = dados.cpf_aluno;
       const  codigo_turma = dados.codigo_turma;
       const  codigo_disciplina = dados.codigo_disciplina;
       const  valor_nota = dados.valor_nota;
       const  data_avaliacao = dados.data_avaliacao;
       const  tipo_avaliacao = dados.tipo_avaliacao;
       const  peso_avaliacao = dados.peso_avaliacao;
       const  observacao = dados.observacao

        if(cpf_aluno ,codigo_turma,codigo_disciplina, valor_nota,  data_avaliacao , tipo_avaliacao, peso_avaliacao, observacao){
           
            try {
                const result = await nota.insertNotas(cpf_aluno ,codigo_turma,codigo_disciplina, valor_nota,  data_avaliacao , tipo_avaliacao, peso_avaliacao, observacao);

                    if(result){
                        return res.status(201).json({menssagem:'Notas cadastrada com sucesso'})
                    }
            } catch (error) {
                    console.log('Erro ao cadastrar a nova Notas:'+error);
                    res.status(500).json({
                        erro:"Internal Server Error",
                        mensagem:'Ocorreu um erro ao cadastrar a Notas!'})
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
        const anoNotas = req.body.anoNotas;
        const qtde =  req.body.qtde;
     

        if(descricao,anoNotas,qtde,codigo){
           
            try {
                const result = await nota.updateNotas(codigo,descricao,anoNotas,qtde);

                    if(result){
                        return res.status(201).json({menssagem:'Notas alterada com sucesso'})
                    }
            } catch (error) {
                    console.log('Erro ao alterada a nova Notas:'+error);
                    res.status(500).json({
                        erro:"Internal Server Error",
                        mensagem:'Ocorreu um erro ao alterada a Notas!'})
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
            const result = await nota.getByNome(filtro)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(404).json({error:'Nenhum Notas foi localizado com esse nome'})
            }
        } catch (error) {
            console.log('Erro ao consultar Notas:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar a Notas!'})
        }
    }

     async delete(req,res){
        const codigo = req.params.codigo;

        if(codigo){
            const result = await Notas.deleteNotas(codigo);

            try {
                if(result){
                    return res.status(200).json({menssagem:'Notas apagada com sucesso'})
                }
            } catch (error) {
               
            res.status(500).json({
            erro:"Internal Server Error",
            mensagem:'Ocorreu um erro ao deletar o Notas!'})
            }
        }
        else{
            res.status(400).json({
            erro: "Bad Request",
            mensagem:'Informe o código do Notas'})
        }
     }
    
}

module.exports=NotasContoller;