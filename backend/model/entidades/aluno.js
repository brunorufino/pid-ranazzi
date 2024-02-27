const DataBase = require('../database');
const banco = new DataBase();

class Aluno{
    cpf;
    nome;
    rg;
    data_nasc;
    sexo;
    email;
    rua;
    numero;
    bairro;
    cep;
    cidade;
    nomerep;
    telefone;
    emailrep;
    constructor(cpf,nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep){
        this.cpf=cpf,
        this.nome=nome,
        this.rg=rg,
        this.data_nasc=data_nasc,
        this.sexo=sexo,
        this.email=email,
        this.rua=rua,
        this.numero=numero,
        this.bairro=bairro,
        this.cep=cep,
        this.cidade=cidade,
        this.nomerep=nomerep,
        this.telefone=telefone,
        this.emailrep=emailrep
    }

    async getAll(){
        const aluno = await banco.ExecutaComando(`SELECT 
        cpf, 
        nome, 
        rg, 
        DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc,
        sexo, 
        email, 
        rua, 
        numero, 
        bairro, 
        cep, 
        cidade, 
        nomerep, 
        telefone, 
        emailrep 
    FROM aluno;`);
        
        return aluno;
    }

    async getByCpf(cpf){
        const result = await banco.ExecutaComando('SELECT * FROM aluno WHERE cpf = ?',[cpf])
        if(result.length > 0)
        return true;
    else{
        return false;
    }
    }
          /**pesquisa por nome**/
    async getByNome (nome){
        var sql = `SELECT 
        cpf, 
        nome, 
        rg, 
        DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc,
        sexo, 
        email, 
        rua, 
        numero, 
        bairro, 
        cep, 
        cidade, 
        nomerep, 
        telefone, 
        emailrep 
    FROM aluno where nome like '%${nome}%'`;
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

    async buscarCpf(cpf){
        const result = await banco.ExecutaComando(`SELECT 
        cpf, 
        nome, 
        rg, 
        DATE_FORMAT(data_nasc, '%Y-%m-%d') AS data_nasc,
        sexo, 
        email, 
        rua, 
        numero, 
        bairro, 
        cep, 
        cidade, 
        nomerep, 
        telefone, 
        emailrep from aluno where cpf= ?`,[cpf])
        const aluno = result[0];
        return aluno;
    }

    async updateAluno(nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep,cpf){
            
            const result = await banco.ExecutaComandoNonQuery(`
            update aluno 
            SET 
                nome = ?,
                rg = ?,
                data_nasc = ?,
                sexo = ?,
                email = ?,
                rua = ?,
                numero = ?,
                bairro = ?,
                cep = ?,
                cidade = ?,
                nomerep = ?,
                telefone = ?,
                emailrep = ?
            WHERE cpf =?`,
            [
                nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep,cpf
            ]);
            
            return result;
    }

    async insertAluno(cpf,nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep){

        const result = await banco.ExecutaComandoNonQuery(`INSERT INTO aluno 
        ( 
            cpf,
            nome,
            rg,
            data_nasc,
            sexo,
            email,
            rua,
            numero,
            bairro,
            cep,
            cidade,
            nomerep,
            telefone,
            emailrep)
            VALUES 
            (? ,? ,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [cpf,nome,rg,data_nasc,sexo,email,rua,numero,bairro,cep,cidade,nomerep,telefone,emailrep
            ]);
            
            return result;
    }


    async deleteAluno(cpf){
        const result = await banco.ExecutaComandoNonQuery('delete from aluno where cpf= ?',[cpf]);

        return result;
    }







}

module.exports = Aluno;