import "./CadastroAluno.css";
import CadastroAlunoService from "../../pages/services/servicesAluno";
import React, { useEffect, useState } from "react";
import Validacoes from "./scriptTurma";

const CadastroAlunoServices = new CadastroAlunoService();
const validacoes = new Validacoes();

const limpar = () => {
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("rg").value = "";
  document.getElementById("data_nasc").value = "";
  document.getElementById("sexoMasculino").checked = false;
  document.getElementById("sexoFeminino").checked = false;
  document.getElementById("email").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("numero").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cep").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("nomerep").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("emailrep").value = "";
};

function CadastroAluno() {
  const [CadastroAluno, setCadastroAluno] = useState([]);
  const [CadastroAlunoData, setCadastroAlunoData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    data_nasc: "",
    sexo: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    nomerep: "",
    telefone: "",
    emailrep: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCadastroAlunoData({ ...CadastroAlunoData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await CadastroAlunoServices.createCadastroAluno(CadastroAlunoData);
      alert("Aluno cadastrado com sucesso!");
      await carregaCadastroAluno();
    } catch (error) {
      alert("Erro ao cadastrar aluno!");
    }
  };

  async function deletar(cpf) {
    try {
      await CadastroAlunoServices.deleteCadastroAluno(cpf);
      alert("Aluno excluido com sucesso!");
      await carregaCadastroAluno();
    } catch (error) {
      alert("Erro ao excluir aluno!");
    }
  }

  const carregaCadastroAluno = async () => {
    try {
      const dados = await CadastroAlunoServices.getAllCadastroAluno();
      setCadastroAluno(dados);
    } catch (erro) {
      console.log(erro);
    }
  };




  




  async function atualizar(aluno) {
    /** Devolver valor para os campos de input */

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("rg").value = aluno.rg;
    document.getElementById("data_nasc").value = aluno.data_nasc;
    document.getElementById('sexo'+ aluno.sexo).checked = true; 
    document.getElementById("email").value = aluno.email;
    document.getElementById("rua").value = aluno.rua;
    document.getElementById("numero").value = aluno.numero;
    document.getElementById("bairro").value = aluno.bairro;
    document.getElementById("cep").value = aluno.cep;
    document.getElementById("cidade").value = aluno.cidade;
    document.getElementById("nomerep").value = aluno.nomerep;
    document.getElementById("telefone").value= aluno.telefone;
    document.getElementById("emailrep").value= aluno.emailrep;
  }

  useEffect(() => {
    carregaCadastroAluno();
  }, []);



  const getByCPF = async() =>{


    try {
      const cpf = document.getElementById('cpf').value;

      /** Captura os dados por CPF e retorna em dados */
      const aluno = await CadastroAlunoServices.getByDocument(cpf);
    
      
     
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("rg").value = aluno.rg;
    document.getElementById("data_nasc").value = aluno.data_nasc;
    document.getElementById('sexo'+ aluno.sexo).checked = true; 
    document.getElementById("email").value = aluno.email;
    document.getElementById("rua").value = aluno.rua;
    document.getElementById("numero").value = aluno.numero;
    document.getElementById("bairro").value = aluno.bairro;
    document.getElementById("cep").value = aluno.cep;
    document.getElementById("cidade").value = aluno.cidade;
    document.getElementById("nomerep").value = aluno.nomerep;
    document.getElementById("telefone").value= aluno.telefone;
    document.getElementById("emailrep").value= aluno.emailrep;
    const sexo = document.getElementById(sexo).value;
    sexo.click();

     
    } catch (error) {
      
    }
  
  };


  function validarCPF(cpf,id){
    validacoes.validaCPF(cpf,id)
  }

  const atualizarCadrastoAluno = async () => {
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const data_nasc = document.getElementById("data_nasc").value;
    const sexoMasculino = document.getElementById("sexoMasculino");
    const sexoFeminino = document.getElementById("sexoFeminino");
    const sexo = sexoMasculino.checked
      ? sexoMasculino.value
      : sexoFeminino.checked
      ? sexoFeminino.value
      : "";
    const email = document.getElementById("email").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    const bairro = document.getElementById("bairro").value;
    const cep = document.getElementById("cep").value;
    const cidade = document.getElementById("cidade").value;
    const nomerep = document.getElementById("nomerep").value;
    const telefone = document.getElementById("telefone").value;
    const emailrep = document.getElementById("emailrep").value;

    const dados = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      data_nasc: data_nasc,
      sexo: sexo,
      email: email,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      nomerep: nomerep,
      telefone: telefone,
      emailrep: emailrep,
    };

    console.log(nome);
    console.log(cpf);
    console.log(rg);
    console.log(data_nasc);
    console.log(sexo);
    console.log(email);
    console.log(rua);
    console.log(numero);
    console.log(bairro);
    console.log(cep);
    console.log(cidade);
    console.log(nomerep);
    console.log(telefone);
    console.log(emailrep);

    try {
      await CadastroAlunoServices.atualizarCadastroAluno(dados);

      limpar();
      alert("Aluno atualizado com sucesso!");
      await carregaCadastroAluno();
    } catch (error) {
      alert("Erro ao atualizar!");
      console.log("Erro ao atualizar:", error);
    }
  };

  return (
    <form className="alinhamento" onSubmit={handleSubmit}>
      <div className="card">
        <h5 className="card-header">GERENCIAR ALUNO</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <span>
                NOME ALUNO<b>*</b>
              </span>
              <div className="input-group       flex-nowrap">
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  placeholder="Nome Aluno"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  autoComplete="nome"
                />
                &nbsp; &nbsp;
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <span>
                CPF<b>*</b>
              </span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  className="form-control"
                  placeholder="Ex.:000.000.000-00"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  onKeyUp={(e)=> validarCPF(e.target.value,'cpf')}
                  autoComplete="cpf"
                />
                 &nbsp; &nbsp;
                 <i class="bi bi-search my-custom-icon"  onClick={() => getByCPF()} ></i>
              </div>
            </div>

            <div className="col-2">
              <span>
                RG<b>*</b>
              </span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  className="form-control"
                  placeholder="Ex.: 00000000-0"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  autoComplete="rg"
                  required
                />
              </div>
            </div>

            <div className="col-2">
              <span>
                DATA NASCIMENTO<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="data_nasc"
                  id="data_nasc"
                  type="date"
                  class="form-control"
                  placeholder="dd/mm/aaaa"
                  onChange={handleInputChange}
                  autoComplete="data_nasc"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <span>
                SEXO<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="sexo"
                  id="sexoMasculino"
                  type="radio"
                  value="Masculino"
                  onChange={handleInputChange}
                  autoComplete="sexo"
                />
                <b className="cor_genero">&nbsp;MASCULINO &nbsp;&nbsp;</b>
                <input
                  name="sexo"
                  id="sexoFeminino"
                  type="radio"
                  value="Feminino"
                  onChange={handleInputChange}
                  autoComplete="sexy"
                  required
                />
                <b className="cor_genero">&nbsp;FEMININO</b>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <span>
                E-MAIL<b>*</b>
              </span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="exemplo@exemplo.com"
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <span>
                ENDEREÇO<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="rua"
                  id="rua"
                  type="text"
                  class="form-control"
                  placeholder="Rua.:"
                  onChange={handleInputChange}
                  autoComplete="rua"
                  required
                />
              </div>
            </div>
            <div className="col-1">
              <span>
                NÚMERO<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="numero"
                  id="numero"
                  type="text"
                  class="form-control"
                  placeholder="N.º"
                  onChange={handleInputChange}
                  autoComplete="numero"
                  required
                />
              </div>
            </div>
            <div className="col-2">
              <span>
                BAIRRO<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="bairro"
                  id="bairro"
                  type="text"
                  class="form-control"
                  placeholder="Bairro"
                  onChange={handleInputChange}
                  autoComplete="bairro"
                  required
                />
              </div>
            </div>
            <div className="col-1">
              <span>
                CEP<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="cep"
                  id="cep"
                  type="int"
                  class="form-control"
                  placeholder="00000-000"
                  onChange={handleInputChange}
                  autoComplete="cep"
                  required
                />
              </div>
            </div>

            <div className="col-2">
              <span>
                CIDADE<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="cidade"
                  id="cidade"
                  type="text"
                  class="form-control"
                  placeholder="Cidade"
                  onChange={handleInputChange}
                  autoComplete="cidade"
                  required
                />
              </div>
            </div>
          </div>
          &nbsp;
          <div className="row">
            <div className="col-4">
              <span>
                NOME REPRESENTANTE<b>*</b>
              </span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="nomerep"
                  name="nomerep"
                  className="form-control"
                  placeholder="Nome Representante"
                  onChange={handleInputChange}
                  autoComplete="nomerep"
                />
              </div>
            </div>
            <div className="col-3">
              <span>
                TELEFONE<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="telefone"
                  id="telefone"
                  type="int"
                  class="form-control"
                  placeholder="(99) 99999-9999"
                  onChange={handleInputChange}
                  autoComplete="telefone"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <span>
                E-MAIL<b>*</b>
              </span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="emailrep"
                  name="emailrep"
                  className="form-control"
                  placeholder="exemplo@exemplo.com"
                  onChange={handleInputChange}
                  autoComplete="emailrep"
                />
              </div>
            </div>
          </div>
          &nbsp;
        </div>

        <div className="row aling-itens-botoes alinhamento">
          <div className="col-2">
            <button type="submit" class="btn btn-success">
              <i class="bi bi-bag-plus"></i>&nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-2">
            <button
              type="button"
              id="atualizar"
              onClick={(e) => atualizarCadrastoAluno()}
              class="btn btn-primary"
            >
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>
          {/* <div className="col-3">
            <button type="button" class="btn btn-danger">
              <i class="bi bi-trash"></i>&nbsp; EXCLUIR
            </button>
          </div> */}
          <div className="row">&nbsp;</div>
        </div>
      </div>
      <div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">RG</th>
                <th scope="col">Data Nasc.</th>
                <th scope="col">Sexo</th>
                <th scope="col">E-mail</th>
                <th scope="col">Endereço</th>
                <th scope="col">N.º</th>
                <th scope="col">Bairro</th>
                <th scope="col">CEP</th>
                <th scope="col">Cidade</th>
                <th scope="col">Nome Rep.</th>
                <th scope="col">Telefone</th>
                <th scope="col">E-mail</th>
              </tr>
            </thead>
            <tbody>
              {CadastroAluno.map((CadastroAluno) => (
                <tr>
                  <td>{CadastroAluno.nome}</td>
                  <td>{CadastroAluno.cpf}</td>
                  <td>{CadastroAluno.rg}</td>
                  <td>{CadastroAluno.data_nasc}</td>
                  <td>{CadastroAluno.sexo}</td>
                  <td>{CadastroAluno.email}</td>
                  <td>{CadastroAluno.rua}</td>
                  <td>{CadastroAluno.numero}</td>
                  <td>{CadastroAluno.bairro}</td>
                  <td>{CadastroAluno.cep}</td>
                  <td>{CadastroAluno.cidade}</td>
                  <td>{CadastroAluno.nomerep}</td>
                  <td>{CadastroAluno.telefone}</td>
                  <td>{CadastroAluno.emailrep}</td>
                  <td><i class="bi bi-trash"  style={{ color: 'red' }}  onClick={() => deletar(CadastroAluno.cpf)}></i></td>
                  <td><i class="bi bi-pen"  style={{ color: 'blue' }} onClick={() => atualizar(CadastroAluno)}></i></td>
                 
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
}

export default CadastroAluno;
