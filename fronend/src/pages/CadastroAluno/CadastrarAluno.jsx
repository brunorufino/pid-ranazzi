import "./CadastroAluno.css";
import CadastroAlunoService from "../../pages/services/servicesAluno";
import React, { useEffect, useState } from "react";
import Validacoes from "./scriptAluno";
import { IMaskInput } from "react-imask";
import { format, isAfter } from "date-fns";

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
  const [alunoNome, setAlunoNome] = useState("");
  const [filtrarNome, setFiltrarNome] = useState([]);
  //const [CadastroAluno, setCadastroAluno] = useState([]);
  const [CadastroAlunoData, setCadastroAlunoData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "data_nasc") {
      const currentDate = new Date();
      const selectDate = new Date(value);

      if (isAfter(selectDate, currentDate)) {
        alert("A data de nascimento não pode ser futura");
        return;
      }
    }

    setCadastroAlunoData((prevData) => ({ ...prevData, [name]: value }));

  
    if (name === "email") {
      validacoes.validaEmail(value, name);
    }
    if (name === "rua") {
      validacoes.validaRua(value, name);
    }
    if (name === "emailrep") {
      validacoes.validaEmailRep(value, name);
    }
    if (name === "rg") {
      validacoes.validaRG(value, name);
    }
  
    if (name === "numero") {
      validacoes.validaNumero(value, name);
    }
  
    if (name === "cep") {
      validacoes.validaCEP(value, name);
    }

    if (name === "cidade") {
      validacoes.validaCidade(value, "cidade");
    }

    if (name === "bairro") {
      validacoes.validaBairro(value, "bairro");
    }

    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let erro = document.querySelectorAll(".vermelho");
    if (erro.length < 1) {
      try {
        await CadastroAlunoServices.createCadastroAluno(CadastroAlunoData);

        alert("Aluno cadastrado com sucesso!");
        await carregaCadastroAluno();

        limpar();
      } catch (error) {
        alert("Erro ao cadastrar aluno!");
      }
    } else {
      alert("Cadastre todos os campos obrigatórios com dados válidos");
    }
  };


  /**Limpar campos */
  const handleReset = () => {
    const inputElements = document.querySelectorAll("input, IMaskInput");

    inputElements.forEach((input) => {
      if (input.classList.contains("IMaskInput")) {
        const imaskInput = IMaskInput.getInputByNode(input);
        if (imaskInput) {
          imaskInput.unmaskedValue = "";
        }
      } else if (input.type === "radio"){
                input.checked = false;
      }
      else {
        input.value = "";
        input.classList.remove("vermelho");
      }
    });
    carregaCadastroAluno();
  };

  const [CadastroAluno, setCadastroAluno] = useState([]); /**aluno, setAluno */

  const carregaCadastroAluno = async () => {
    try {
      const dados = await CadastroAlunoServices.getAllCadastroAluno();
      setCadastroAluno(dados);
    } catch (error) {
      console.error("Erro ao carregar aluno");
    }
  };

  async function getByNome(nomee) {
    const nome = {
      nome: `${nomee.toLowerCase()}`,
    };
    try {
      const dados = await CadastroAlunoServices.filtrar(nome);

      if (dados.length > 0) {
        const dadosFiltroNome = dados.map((aluno) => ({
          nome: `${aluno.nome}`,
          cpf: `${aluno.cpf}`,
          rg: `${aluno.rg}`,
          data_nasc: `${aluno.data_nasc}`,
          sexo: `${aluno.sexo}`,
          email: `${aluno.email}`,
          rua: `${aluno.rua}`,
          numero: `${aluno.numero}`,
          bairro: `${aluno.bairro}`,
          cep: `${aluno.cep}`,
          cidade: `${aluno.cidade}`,
          nomerep: `${aluno.nomerep}`,
          telefone: `${aluno.telefone}`,
          emailrep: `${aluno.emailrep}`,
        }));

        setCadastroAluno(dadosFiltroNome);
      } else {
        alert("Nenhum aluno encontrado");
      }
    } catch (erro) {}
  }

  async function deletar(cpf) {
    const confirmacao = window.confirm("Confirma a exclusão?");
    if (confirmacao) {
      try {
        await CadastroAlunoServices.deleteCadastroAluno(cpf);
        alert("Aluno excluido com sucesso!");
        await carregaCadastroAluno();
      } catch (error) {
        alert("Erro ao excluir aluno!");
      }
    }
  }

  async function atualizar(aluno) {
   

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("rg").value = aluno.rg;
    document.getElementById("data_nasc").value = aluno.data_nasc;
    document.getElementById("sexo" + aluno.sexo).checked = true;
    document.getElementById("email").value = aluno.email;
    document.getElementById("rua").value = aluno.rua;
    document.getElementById("numero").value = aluno.numero;
    document.getElementById("bairro").value = aluno.bairro;
    document.getElementById("cep").value = aluno.cep;
    document.getElementById("cidade").value = aluno.cidade;
    document.getElementById("nomerep").value = aluno.nomerep;
    document.getElementById("telefone").value = aluno.telefone;
    document.getElementById("emailrep").value = aluno.emailrep;
  }

  useEffect(() => {
    carregaCadastroAluno();
  }, []);

  const getByCPF = async () => {
    try {
      const cpf = document.getElementById("cpfBusca").value;

    
      const aluno = await CadastroAlunoServices.getByDocument(cpf);

      document.getElementById("nome").value = aluno.nome;
      document.getElementById("cpf").value = aluno.cpf;
      document.getElementById("rg").value = aluno.rg;
      document.getElementById("data_nasc").value = aluno.data_nasc;
      document.getElementById("sexo" + aluno.sexo).checked = true;
      document.getElementById("email").value = aluno.email;
      document.getElementById("rua").value = aluno.rua;
      document.getElementById("numero").value = aluno.numero;
      document.getElementById("bairro").value = aluno.bairro;
      document.getElementById("cep").value = aluno.cep;
      document.getElementById("cidade").value = aluno.cidade;
      document.getElementById("nomerep").value = aluno.nomerep;
      document.getElementById("telefone").value = aluno.telefone;
      document.getElementById("emailrep").value = aluno.emailrep;
      const sexo = document.getElementById(sexo).value;
      sexo.click();
    } catch (error) {}
  };

  function validarCPF(cpf, id) {
    validacoes.validaCPF(cpf, id);
  }

  function validaNome(nome, id) {
    validacoes.validaNome(nome, id);
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

    try {
      await CadastroAlunoServices.atualizarCadastroAluno(dados);

      limpar();
      alert("Aluno atualizado com sucesso!");
      await carregaCadastroAluno();


      } catch (error) {
      alert("Erro ao atualizar!");
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
                  onBlur={(e) => validaNome(e.target.value, "nome")}
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
                <IMaskInput
                  mask="000.000.000-00"
                  type="text"
                  id="cpf"
                  name="cpf"
                  className="form-control"
                  placeholder="Digite o CPF"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  onKeyUp={(e) => validarCPF(e.target.value, "cpf")}
                  autoComplete="cpf"
                />
                &nbsp; &nbsp;
                {/* <i class="bi bi-search my-custom-icon"  onClick={() => getByCPF()} ></i> */}
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
                  placeholder="Digite o RG"
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
                  placeholder="Rua/Av.:"
                  onChange={handleInputChange}
                  onBlur={(e) => validaNome(e.target.value, "rua")}
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
                  onBlur={(e) => validaNome(e.target.value, "bairro")}
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
                <IMaskInput
                  mask="00000-000"
                  name="cep"
                  id="cep"
                  type="int"
                  class="form-control"
                  placeholder="Digite o CPF"
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
                  onBlur={(e) => validaNome(e.target.value, "cidade")}
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
                  onBlur={(e) => validaNome(e.target.value, "nomerep")}
                  autoComplete="nomerep"
                />
              </div>
            </div>
            <div className="col-2">
              <span>
                TELEFONE<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <IMaskInput
                  mask="(00) 00000-0000"
                  name="telefone"
                  id="telefone"
                  type="int"
                  class="form-control"
                  placeholder="Digite o telefone"
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
                  //onBlur={(e) => validarEmail(e.target.value, "email")}
                  autoComplete="emailrep"
                />
              </div>
            </div>
          </div>
          &nbsp;
        </div>

        <div className="row aling-itens-botoes alinhamento">
          <div className="col-2">
            <button type="submit" className="btn btn-success">
              <i class="bi bi-bag-plus"></i>&nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-2">
            <button
              type="button"
              id="atualizar"
              onClick={(e) => atualizarCadrastoAluno()}
              className="btn btn-primary"
            >
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>

          <div className="col-2">
            <button
              type="button"
              value="reset"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <i class="bi bi-arrow-repeat"></i>&nbsp; LIMPAR
            </button>
          </div>

          <div className="row">&nbsp;</div>
        </div>

        <h5 className="hf">Filtro de Buscas:</h5>
        <div className=" col-12 d-flex justify-content-around mt-4 mb-4">

            <div className="col-2">
              <span className="sf">Nome</span>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  id="nomeBusca"
                  name="nomeBusca"
                  className="form-control"
                  placeholder="Nome Aluno"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  onBlur={(e) => setAlunoNome(e.target.value)}
                  onKeyUp={(e)=>validaNome(e.target.value, 'nomeBusca')}
                  
                />
                &nbsp;&nbsp;
                <i
                  className="bi bi-search my-custom-icon"
                  onClick={() => getByNome(alunoNome)}
                ></i>
              </div>
              &nbsp;
            </div>

            <div className="col-2">
              <span className="sf">CPF</span>
              <div className="input-group flex-nowrap">
                <IMaskInput
                  mask="000.000.000-00"
                  type="text"
                  id="cpfBusca"
                  name="cpfBusca"
                  className="form-control"
                  placeholder="Digite o CPF"
                  aria-describedby="addon-wrapping"
                  onChange={handleInputChange}
                  onKeyUp={(e) => validarCPF(e.target.value, "cpfBusca")}
                  autoComplete="cpf"
                />
                &nbsp;&nbsp;
                <i
                  className="bi bi-search my-custom-icon"
                  onClick={() => getByCPF()}
                ></i>
              </div>
              &nbsp;
            </div>
          
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

                  <td>
                    <i
                      class="bi bi-trash"
                      style={{ color: "red" }}
                      onClick={() => deletar(CadastroAluno.cpf)}
                    ></i>
                  </td>
                  <td>
                    <i
                      class="bi bi-pen"
                      style={{ color: "blue" }}
                      onClick={() => atualizar(CadastroAluno)}
                    ></i>
                  </td>
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
