
const Funcionario = require("../model/entidades/funcionario");

const funcionario = new Funcionario()

class FucionarioContoller{

    async getAll(req,res){

        try {
            const result = await funcionario.getAll()
            return res.status(200).json(result)
        } catch (error) {
            console.log('Erro ao consultar funcionário:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o funcionário!'})
        }
    }
    async getByDocumento(req,res){

        const cpf = req.params.cpf;
        try {
            const result = await funcionario.getByDocumento(cpf)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(404).json({error:'Nenhum funcionário foi localizado com esse documento'})
            }
        } catch (error) {
            console.log('Erro ao consultar funcionário:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o funcionário!'})
        }
    }

    async getByName(req,res){

        const filtro = req.body.nome;
        console.log(filtro);
        try {
            const result = await funcionario.getByNome(filtro)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(404).json({error:'Nenhum funcionário foi localizado com esse nome'})
            }
        } catch (error) {
            console.log('Erro ao consultar funcionário:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o funcionário!'})
        }
    }

    async getByCPF(req,res){

        const cpf = req.body.cpf;

        try {
            const result = await funcionario.getByCPF(cpf)
            if(result){
                  return res.status(200).json(result)
            }
            else{
                res.status(500).json({error:'Nenhum funcionário foi localizado com esse CPF'})
            }
        } catch (error) {
            console.log('Erro ao consultar funcionário:'+error);
            res.status(500).json({error:'Ocorreu um erro ao consultar o funcionário!'})
        }
    }



    async create(req,res){
       var cpfExiste = false;
       var cpfValido = false;

        const nome = req.body.nome;
        const rg = req.body.rg;
        const cpf =  req.body.cpf;
        const dataNascimento = req.body.dataNascimento;
        const genero = req.body.genero;
        const rua = req.body.rua;
        const numero = req.body.numero; 
        const cidade =  req.body.cidade; 
        const estado = req.body.estado; 
        const cep = req.body.cep;
        const email = req.body.email;
        const telefone = req.body.telefone;
        const codDepartamento = req.body.codDepartamento;
        const dataAdmissao = req.body.dataAdmissao;

        if(nome,rg,cpf,dataNascimento,genero,rua,numero,cidade,estado,cep,email,telefone,codDepartamento,dataAdmissao){
           
            /* Valida se o CPF já está cadastrado na base  */
            cpfExiste = await funcionario.getByCPF(cpf); 
            cpfValido = await funcionario.validarCPF(cpf);
            
            if(cpfValido != false){
                if(cpfExiste != true){
                    try {
                        const result = await funcionario.insertFuncionario(
                            nome,rg,cpf,dataNascimento,genero,rua,
                            numero,cidade,estado,cep,email,telefone,
                            codDepartamento,dataAdmissao)

                            if(result){
                                cpfExiste = false;
                                return res.status(201).json({menssagem:'Funcionário cadastrado com sucesso'})
                            }
                    } catch (error) {
                            console.log('Erro ao cadastrar o novo funcionário:'+error);
                            res.status(500).json({
                                erro:"Internal Server Error",
                                mensagem:'Ocorreu um erro ao cadastrar o funcionário!'})
                    }
                }
                else{
                    res.status(409).json({
                    erro: "Conflict",
                    mensagem:'O CPF informado já está registrado!!'})
                }
            }
            else{
                    res.status(400).json({
                    erro: "Bad Request",
                    mensagem:'O CPF informado não é um valor válido!!'})
            }
        }
        else{
            res.status(400).json({
                erro: "Bad Request",
                mensagem:'Informe todos os campos obrigatórios'})
        }
    }

    async update(req,res){
        var cpfValido = false;
        var cpfExiste = false;


         const codigo = req.body.codigo;
         const nome = req.body.nome;
         const rg = req.body.rg;
         const cpf =  req.body.cpf;
         const dataNascimento = req.body.dataNascimento;
         const genero = req.body.genero;
         const rua = req.body.rua;
         const numero = req.body.numero; 
         const cidade =  req.body.cidade; 
         const estado = req.body.estado; 
         const cep = req.body.cep;
         const email = req.body.email;
         const telefone = req.body.telefone;
         const codDepartamento = req.body.codDepartamento;
         const dataAdmissao = req.body.dataAdmissao;
 
         if(codigo,nome,rg,cpf,dataNascimento,genero,rua,numero,cidade,estado,cep,email,telefone,codDepartamento,dataAdmissao){
            
             /* Valida se o CPF já está cadastrado na base  */
             cpfExiste = await funcionario.getByCPF(cpf); 
             cpfValido = await funcionario.validarCPF(cpf);
             
             if(cpfValido != false){
                     try {
                         const result = await funcionario.updateFuncionario(
                             nome,rg,cpf,dataNascimento,genero,rua,
                             numero,cidade,estado,cep,email,telefone,
                             codDepartamento,dataAdmissao,codigo)
 
                             if(result){
                                 cpfExiste = false;
                                 return res.status(200).json({menssagem:'Funcionário alterado com sucesso'})
                             }
                     } catch (error) {
                             console.log('Erro ao alterar o funcionário:'+error);
                             res.status(500).json({
                                erro:"Internal Server Error",
                                mensagem:'Ocorreu um erro ao alterar o funcionário!'})
                     }
             }
             else{
                     res.status(400).json({
                     erro: "Bad Request",
                     mensagem:'O CPF informado não é um valor válido!!'})
             }
         }
         else{
             res.status(400).json({
                 erro: "Bad Request",
                 mensagem:'Informe todos os campos obrigatórios'})
         }
     }

     async delete(req,res){
        const codigo = req.params.codigo;

        if(codigo){
            const result = await funcionario.deleteFuncionario(codigo);

            try {
                if(result){
                    return res.status(200).json({menssagem:'Funcionário apagado com sucesso'})
                }
            } catch (error) {
               
            res.status(500).json({
            erro:"Internal Server Error",
            mensagem:'Ocorreu um erro ao deletar o funcionário!'})
            }
        }
        else{
            res.status(400).json({
            erro: "Bad Request",
            mensagem:'Informe o código do funcionário'})
        }
     }
    
}

module.exports=FucionarioContoller;