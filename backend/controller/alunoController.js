//const { default: CadastroAluno } = require("../../frontend/src/pages/CadastroAluno/CadastrarAluno");

const Aluno = require("../model/entidades/aluno");

const aluno = new Aluno();

class AlunoController {

 
  async getByCpf(req, res) {
    const cpf = req.params.cpf;
    try {
      const result = await aluno.buscarCpf(cpf);
      if(result){
        return res.status(200).json(result);
      }  else{
        res.status(404).json({error: 'Aluno não encontrado'})
      }
      
    } catch (error) {
      console.log("Erro ao buscar aluno:" + error);
      res.status(500).json({ error: "Erro ao buscar Aluno" });
    }
  }



  async getAll(req, res) {
    try {
      const result = await aluno.getAll();
      return res.status(200).json(result);
    } catch (error) {
      console.log("Erro ao buscar Aluno:" + error);
      res.status(500).json({ error: "Erro ao buscar Aluno" });
    }
  }

  async create(req,res)  {
    var cpfExiste = false;
    var cpfValido = false;

    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const rg = req.body.rg;
    const data_nasc = req.body.data_nasc;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const nomerep = req.body.nomerep;
    const telefone = req.body.telefone;
    const emailrep = req.body.emailrep;

    if(cpf && nome && rg && data_nasc && sexo && email && rua && numero && bairro && cep && cidade && nomerep && telefone && emailrep){
        cpfExiste = await aluno.getByCpf(cpf);
        cpfValido = await aluno.validarCPF(cpf);

        cpfExiste = await aluno.getByCpf(cpf); 
            cpfValido = await aluno.validarCPF(cpf);
            
            if(cpfValido != false){
                if(cpfExiste != true){
                    try {
                        const result = await aluno.insertAluno(
                            cpf,nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep)

                            if(result){
                                cpfExiste = false;
                                return res.status(201).json({menssagem:'Aluno cadastrado com sucesso'})
                            }
                    } catch (error) {
                            console.log('Erro ao cadastrar o novo Aluno:'+error);
                            res.status(500).json({
                                erro:"Internal Server Error",
                                mensagem:'Ocorreu um erro ao cadastrar o Aluno!'})
                    }
                }
                else{
                    res.status(409).json({
                    erro: "Conflict",
                    mensagem:'O CPF informado já está registrado!!'})
                }
            }else{
                    res.status(400).json({
                    erro: "Bad Request",
                    mensagem:'O CPF informado não é um valor válido!!'})
            }
    }else{
      res.status(400).json({
          erro: "Bad Request",
          mensagem:'Informe todos os campos obrigatórios'})
    }

  }
  
  async update(req,res){
    var cpfValido = false;
    var cpfExiste = false;

    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const rg = req.body.rg;
    const data_nasc = req.body.data_nasc;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const bairro = req.body.bairro;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const nomerep = req.body.nomerep;
    const telefone = req.body.telefone;
    const emailrep = req.body.emailrep;

    if(cpf && nome && rg && data_nasc && sexo && email && rua && numero && bairro && cep && cidade && nomerep && telefone && emailrep){
      cpfExiste = await aluno.getByCpf(cpf);
      cpfValido = await aluno.validarCPF(cpf);

      
        try {
            const result = await aluno.updateAluno(
              nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep,cpf)

                if(result){
                    cpfExiste = false;
                    return res.status(200).json({menssagem:'Aluno alterado com sucesso'})
                }
        } catch (error) {
                console.log('Erro ao alterar o Aluno:'+error);
                res.status(500).json({
                   erro:"Internal Server Error",
                   mensagem:'Ocorreu um erro ao alterar o Aluno!'})
        }
      }else{
        res.status(400).json({
        erro: "Bad Request",
        mensagem:'O CPF informado não é um valor válido!!'})
      
    }

}


  /*
  async update(req,res){
    const cpf = req.params.id
    const dados = req.body 
    const nome = dados.nome
    const rg = dados.rg
    const data_nasc = dados.data_nasc
    const sexo = dados.sexo
    const email = dados.email
    const rua = dados.rua
    const numero = dados.numero
    const bairro = dados.bairro
    const cep = dados.cep
    const cidade = dados.cidade
    const nomerep = dados.nomerep
    const telefone = dados.telefone 
    const emailrep = dados.emailrep

    if(nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep){
      try{
        await CadastroAluno.update(dados,cpf)
        res.status(201).json({message: 'Aluno atualizado com sucesso'})
      }
      catch(erro){
        console.log('Erro ao atualizar aluno: ', erro)
        res.status(500).json({erro: 'Erro ao atualizar aluno'})
      }
    }
    else{
      res.status(400).json({
        erro: "bad request",
        mensagem:'Informe todos os campos obrigatórios'
      })
    }
    
  }
*/

  async delete(req,res){
    const cpf = req.params.cpf;

    if(cpf){
        const result = await aluno.deleteAluno(cpf);

        try {
            if(result){
                return res.status(200).json({menssagem:'Aluno apagado com sucesso'})
            }
        } catch (error) {
           
        res.status(500).json({
        erro:"Internal Server Error",
        mensagem:'Ocorreu um erro ao deletar o Aluno!'})
        }
    }else{
        res.status(400).json({
        erro: "Bad Request",
        mensagem:'Informe o CPF do Aluno'})
    }
  }

}
module.exports = AlunoController;
