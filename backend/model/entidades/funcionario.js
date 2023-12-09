const DataBase = require('../database')
const banco = new DataBase()

class Funcionario {
    codigo;
    nome;
    rg;
    cpf;
    dataNascimento
    genero;
    rua;
    numero;
    cidade;
    estado;
    cep;
    email;
    telefone;
    codDepartamento;
    dataAdmissao;
    constructor(codigo,nome,rg,cpf,dataNascimento,genero,
        rua,numero,cidade,estado,cep,email,
        telefone,codDepartamento,dataAdmissao){

            this.codigo = codigo;
            this.nome = nome;
            this.rg = rg;
            this.cpf = cpf;
            this.dataNascimento = dataNascimento;
            this.genero = genero;
            this.rua = rua
            this.numero = numero
            this.cidade = cidade;
            this.estado = estado;
            this.cep = cep;
            this.email = email;
            this.telefone = telefone;
            this.codDepartamento = codDepartamento;
            this.dataAdmissao = dataAdmissao;
            
    }

    async getAll(){
  
        const funcionario = await banco.ExecutaComando(`SELECT codigo, nome, rg, cpf, DATE_FORMAT(dataNascimento, '%Y-%m-%d') as dataNascimento, genero, rua, numero, cidade, estado, cep, email, telefone, codDepartamento, DATE_FORMAT(dataAdmissao, '%Y-%m-%d') as dataAdmissao FROM funcionario`);
        return funcionario;
    }
    
    async getByDocumento(cpf){
        const result = await banco.ExecutaComando(`SELECT codigo, nome, rg, cpf, DATE_FORMAT(dataNascimento, '%Y-%m-%d') as dataNascimento, genero, rua, numero, cidade, estado, cep, email, telefone, codDepartamento, DATE_FORMAT(dataAdmissao, '%Y-%m-%d') as dataAdmissao from funcionario where cpf= ?`,[cpf])
        const funcionario = result[0];
        return funcionario;
    }

     async getByCPF(cpf){
        const result = await banco.ExecutaComando("select * from funcionario where cpf= ?",[cpf])
       
        if(result.length > 0)
            return true;
        else{
            return false;
        }
       
    }

    async getByNome(nome){

    
            var sql = `SELECT codigo, nome, rg, cpf, DATE_FORMAT(dataNascimento, '%Y-%m-%d') as dataNascimento, genero, rua, numero, cidade, estado, cep, email, telefone, codDepartamento, DATE_FORMAT(dataAdmissao, '%Y-%m-%d') as dataAdmissao from funcionario where nome like '%${nome}%'`;
        const result = await banco.ExecutaComando(sql);
        return result;
    }


     async validarCPF(cpf) {
        // Remover caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');
    
        // Verificar se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
    
        // Verificar se todos os dígitos são iguais, o que torna o CPF inválido
        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }
    
        // Calcular o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;
    
        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;
    
        // Verificar se os dígitos verificadores calculados são iguais aos dígitos reais
        return (parseInt(cpf.charAt(9)) === digitoVerificador1 && parseInt(cpf.charAt(10)) === digitoVerificador2);
    }
    
    async insertFuncionario(nome,rg,cpf,dataNascimento,genero,rua,
        numero,cidade,estado,cep
        ,email,telefone,codDepartamento,dataAdmissao){

        const result = await banco.ExecutaComandoNonQuery(`INSERT INTO funcionario 
        ( 
        nome,
        rg,
        cpf,
        dataNascimento,
        genero,
        rua,
        numero,
        cidade,
        estado,
        cep, 
        email,
        telefone,
        codDepartamento,
        dataAdmissao)
            VALUES 
            (? ,? ,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [nome,rg,cpf,dataNascimento,genero,
             rua,numero,cidade,estado,cep,
             email,telefone,codDepartamento,dataAdmissao
            ]);
            
            return result;
    }


    async updateFuncionario(nome,rg,cpf,dataNascimento,genero,rua,
        numero,cidade,estado,cep
        ,email,telefone,codDepartamento,dataAdmissao,codigo){

            const result = await banco.ExecutaComandoNonQuery(`
            UPDATE funcionario 
            SET 
                nome = ?,
                rg = ?,
                cpf = ?,
                dataNascimento = ?,
                genero = ?,
                rua = ?,
                numero = ?,
                cidade = ?,
                estado = ?,
                cep = ?,
                email = ?,
                telefone = ?,
                codDepartamento = ?,
                dataAdmissao = ?
            WHERE codigo = ?`,
            [
                nome, rg, cpf, dataNascimento, genero,
                rua, numero, cidade, estado, cep,
                email, telefone, codDepartamento, dataAdmissao, codigo
            ]);
            
            return result;
    }un

    async deleteFuncionario(codigo){
        const result = await banco.ExecutaComandoNonQuery('delete from funcionario where codigo= ?',[codigo]);

        return result;
    }

}
module.exports=Funcionario