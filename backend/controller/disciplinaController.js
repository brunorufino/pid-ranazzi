const Disciplina = require("../model/entidades/disciplina");

const disciplina = new Disciplina()

class Disciplina_controller{
    
    async getAll(req,res){

        try{
            const result = await disciplina.getAll()
            return res.status(200).json(result)
        }catch(erro){
            console.log('Erro ao buscar a disciplina: ' , erro)
            res.status(500).json({erro: 'Erro ao buscar disciplina'})
        }

    }


    async getById(req,res){
        const codigo = req.params.id
        
        try{
            const result = await disciplina.getById(codigo)

            if(result){
                return res.status(200).json(result)
            }
            else{
                return res.status(404).json({erro: 'Disciplina não encontrada'})   
            }
           
        }catch(erro){
            console.log('Erro ao buscar a disciplina: ' , erro)
            res.status(500).json({erro: 'Erro ao buscar disciplina'})
        }
    }

    async getByNome(req,res){
        const nome = req.body.nome
      
        try{
            const result = await disciplina.getByNome(nome)

            if(result){
              return res.status(200).json(result)
              
            }
            else{
                return res.status(404).json({erro: 'Disciplina não encontrada'})   
            }
        }
        catch(erro){
            console.log('Erro ao buscar a disciplina: ' , erro)
            res.status(500).json({erro: 'Erro ao buscar disciplina'})
        }
    }


    async delete(req,res){
        const codigo = req.params.id
        try{
            await disciplina.delete(codigo)
            res.status(200).json({message: 'Disciplina deletada com sucesso'})
        }
        catch(erro){
            console.log('Erro ao deletar disciplina', erro)
            res.status(500).json({error:'Erro ao deletar disciplina'})
        }
    }

    async create(req,res){
        const dados = req.body
        const nome = dados.nome
        const carga = dados.carga
        const observacao = dados.observacao

        if(nome,carga,observacao){
            try{
                await disciplina.create(dados)
                res.status(201).json({message: 'Disciplina cadastrada com sucesso'})
            }
            catch(erro){
                console.log('Erro ao inserir disciplina: ', erro)
                res.status(500).json({erro: 'Erro ao inserir disciplina'})
            }
        }
        else{
            res.status(400).json({
                erro: "Bad Request",
                mensagem:'Informe todos os campos obrigatórios'})
          }
       
    }

    async update(req,res){
        const codigo = req.params.id
        const dados = req.body
        const nome = dados.nome
        const carga = dados.carga
        const observacao = dados.observacao

        if(nome,carga,observacao){
            try{
                await disciplina.update(dados,codigo)
                res.status(201).json({message: 'Disciplina atualizada com sucesso'})
            }
            catch(erro){
                console.log('Erro ao atualizar disciplina: ', erro)
                res.status(500).json({erro: 'Erro ao atualizar disciplina'})
            }
        }
        else{
            res.status(400).json({
                erro: "Bad Request",
                mensagem:'Informe todos os campos obrigatórios'})
          }
       
    }
}

module.exports = Disciplina_controller