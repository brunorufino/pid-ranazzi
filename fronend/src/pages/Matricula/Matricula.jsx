import "./Matricula.css";
import NotasService from "../services/NotasService";
import { useEffect, useState } from "react";

const NotaService = new NotasService();

function Matricula() {
  const [NotasData, setNotasData] = useState({});
  const [Notas, setNotas] = useState([]);
  const [turmaNome, setTurmaNome] = useState("");
  const [alunoNome, setAlunoNome] = useState("");
  const [disciplinaNome, setDisciplinaNome] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await NotaService.createNota(NotasData);
      alert("Notass cadastrado com sucesso!");
      await carregaNotass();
    } catch (error) {
      alert("Erro ao cadastrar nota do aluno!");
    }
  };

  const carregaNotass = async () => {
    try {
      const dados = await NotaService.getAllNota();

      setNotas(dados);
    } catch (error) {
      console.error("Erro ao carregar Notass");
    }
  };

  useEffect(() => {
    carregaNotass();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNotasData({ ...NotasData, [name]: value });
  };

  const handleEdit = async (Notass) => {
    const btnCadastrar = document.getElementById("CADSATRAR");
    const campoCodigo = document.getElementById("codigo");

    btnCadastrar.disabled = true;
    campoCodigo.disabled = true;

    document.getElementById("codigo").value = Notass.codigo;
    document.getElementById("anoNotass").value = Notass.anoNotass;
    document.getElementById("descricao").value = Notass.descricao;
    document.getElementById("qtde").value = Notass.qtde;
  };
  const handleDelete = async (codigo) => {
    const confirmacao = window.confirm("Confirma a exclusão?");

    if (confirmacao) {
      try {
        await NotaService.deleteNota(codigo);
        await carregaNotass();
        alert("Notass excluída com sucesso!");
      } catch (error) {
        alert("Erro ao excluir Notass!!");
      }
    }
  };

  const atualizarNotass = async () => {
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const anoNotas = document.getElementById("anoNotass").value;
    const qtde = document.getElementById("qtde").value;

    const dados = {
      codigo: codigo,
      descricao: descricao,
      anoNotass: anoNotas,
      qtde: qtde,
    };

    console.log(dados);
    try {
      await NotaService.updateNotass(dados);
      alert("Notass atualizado com sucesso!");
      await carregaNotass();
    } catch (error) {
      alert("Erro ao atualizar! ");
      console.log("Erro ao atualizar: ", error);
    }
  };

  const handleReset = () => {
    const inputElements = document.querySelectorAll("input, IMaskInput");

    inputElements.forEach((input) => {
      input.value = "";
    });
    window.location.reload();
    carregaNotass();
  };

  async function getByNome(nomee, chave) {
    let body = "";

    if (chave === "aluno") {
      body = {
        aluno: `${nomee}`,
      };
    } else {
      if (chave === "turma") {
        body = {
          turma: `${nomee}`,
        };
      } else {
        body = {
          disciplina: `${nomee}`,
        };
      }
    }

    try {
      const dados = await NotaService.filtrar(body);
      if (dados.length > 0) {
        const dadosFiltroNotas = dados.map((Notas) => ({
          codigo: Notas.id,
          nome_aluno: Notas.nome_aluno,
          descricao_turma: Notas.descricao_turma,
          nome_disciplina: Notas.nome_disciplina,
          valor_nota: Notas.valor_nota,
          data_avaliacao: Notas.data_avaliacao,
          tipo_avaliacao: Notas.tipo_avaliacao,
          peso_avaliacao: Notas.peso_avaliacao,
          observacao: Notas.observacao,
        }));

        setNotas(dadosFiltroNotas);
      } else {
        carregaNotass();
      }
    } catch (erro) {}
  }

  return (
    <form className="alinhamento" onSubmit={handleSubmit}>
      <div class="card">
        <h5 class="card-header">GERENCIAR MATRICULA</h5>
        <div class="card-body ">
          <div className="row">
            <div className="col-3">
              <span>
                ALUNO&nbsp;<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="nome_aluno"
                  name="nome_aluno"
                  value={NotasData.nome_aluno}
                />
                &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>
            <div className="col-3">
              <span>
                TURMA&nbsp;<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="descricao_turma"
                  name="descricao_turma"
                  value={NotasData.descricao_turma}
                />
                &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>
          </div>
          <div className="row"></div>
       
        <br/>
          <div className="row">
            <div className="col-3">
              <span>
                DATA MATRICULA&nbsp;<b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  type="date"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="data_avaliacao"
                  name="data_avaliacao"
                  value={NotasData.data_avaliacao}
                />
              </div>
            </div>
          </div>
          <br/>
          <p>
            TRANSFERENCIA&nbsp;<b>*</b>
          </p>
          <div class="input-group flex-nowrap">
            <div class="row">
              <div class="col-5">
                <span>SIM&nbsp;</span>
                <div class="input-group flex-nowrap">
                  <input
                    type="radio"
                    class="form-check-input"
                    onChange={handleInputChange}
                    id="tipo_avaliacao"
                    name="tipo_avaliacao"
                    value={NotasData.tipo_avaliacao}
                  />
                </div>
              </div>
              <div class="col-5">
                <span>NÃO&nbsp;</span>
                <div class="input-group flex-nowrap">
                  <input
                    type="radio"
                    class="form-check-input"
                    onChange={handleInputChange}
                    id="tipo_avaliacao"
                    name="tipo_avaliacao"
                    value={NotasData.tipo_avaliacao}
                  />
                </div>
              </div>
            </div>
          </div>
           <br></br>
          <div>
            <div className="card">
              <h5 class="card-header">DOCUMENTOS</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div class="input-group flex-nowrap">
                        <div  class="col-12">
                              
                             
                                <label>
                                <input type="checkbox" name="certidao" />
                                &nbsp;&nbsp; Certidão de nascimento ou documento de identidade (RG) da criança.
                                </label><br />
                                <label>
                                <input type="checkbox" name="certidao" />
                                &nbsp;&nbsp; CPF (Cadastro de Pessoa Física) dos pais ou responsáveis legais.
                                </label><br />
                                <label>
                                <input type="checkbox" name="rg_pais" />
                                &nbsp;&nbsp; Documento de identidade (RG) dos pais ou responsáveis legais.
                                </label><br />
                                <label>
                                <input type="checkbox" name="cartao_vacinacao" />
                                &nbsp;&nbsp; Cartão de vacinação (em alguns casos).
                                </label><br />
                                <label>
                                <input type="checkbox" name="formularios_preenchidos" />
                                &nbsp;&nbsp; Formulários de inscrição preenchidos.
                                </label><br />
                                <label>
                                <input type="checkbox" name="comprovante_renda" />
                                &nbsp;&nbsp; Comprovante de renda.
                                </label><br />
                                <label>
                                <input type="checkbox" name="fotos_3x4" />
                                &nbsp;&nbsp; Fotos 3x4.
                                </label><br />
                                <label>
                                <input type="checkbox" name="historico_escolar_outro" />
                                &nbsp;&nbsp; Histórico escolar.
                                </label><br />
                                <label>
                                <input type="checkbox" name="cartao_vacinacao_outro" />
                                &nbsp;&nbsp;  Cartão de vacinação.
                                </label><br />
                                <label>
                                <input type="checkbox" name="cns_sus" />
                                &nbsp;&nbsp; Cartão Nacional de Saúde (CNS) ou número do SUS (Sistema Único de Saúde).
                                </label><br/>


                        </div>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>

          <div className="row">
            <div className="mt-5">
              <div id="observacao">
                <label htmlFor="obs" class="obs">
                  OBSERVAÇÕES <span className="span">*</span>
                </label>
                <div className="input-group flex-nowrap">
                  <textarea
                    name="observacao"
                    id="obs"
                    cols="70"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row aling-itens-botoes">
          <div className="col-3">
            <button
              type="submit"
              id="CADSATRAR"
              name=""
              class="btn btn-success"
            >
              <i class="bi bi-bag-plus"></i> &nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              class="btn btn-info cor_botao"
              onClick={() => atualizarNotass()}
            >
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              value="reset"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <i class="bi bi-arrow-repeat"></i>&nbsp; LIMPAR
            </button>
          </div>
        </div>
        <div class="row">&nbsp;</div>
      </div>

      <div class="container mt-4">
        <div className="row">
          <h5 className="hf">Filtro de Buscas:</h5>
        </div>
        <div className="row">&nbsp;&nbsp;</div>
        <div class="row">
          <div class="col-4">
            <div class="input-group flex-nowrap">
              <input
                name="nomePesquisa"
                id="nomePesquisa"
                type="text"
                class="form-control"
                placeholder="Pesquisar por nome aluno"
                value={Notas.nome}
                onChange={handleInputChange}
                onBlur={(e) => setAlunoNome(e.target.value)}
              />
              &nbsp; &nbsp;
              <i
                class="bi bi-search my-custom-icon"
                onClick={() => getByNome(alunoNome, "aluno")}
              ></i>{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div class="col-4">
            <div class="input-group flex-nowrap">
              <input
                name="nomePesquisa"
                id="nomePesquisa"
                type="text"
                class="form-control"
                placeholder="Pesquisar por nome disciplina"
                value={Notas.nome}
                onChange={handleInputChange}
                onBlur={(e) => setDisciplinaNome(e.target.value)}
              />
              &nbsp; &nbsp;
              <i
                class="bi bi-search my-custom-icon"
                onClick={() => getByNome(disciplinaNome, "disciplina")}
              ></i>{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div class="col-4">
            <div class="input-group flex-nowrap">
              <input
                name="nomePesquisa"
                id="nomePesquisa"
                type="text"
                class="form-control"
                placeholder="Pesquisar por nome turma"
                value={Notas.nome}
                onChange={handleInputChange}
                onBlur={(e) => setTurmaNome(e.target.value)}
              />
              &nbsp; &nbsp;
              <i
                class="bi bi-search my-custom-icon"
                onClick={() => getByNome(turmaNome, "turma")}
              ></i>
            </div>
          </div>
        </div>
        <div className="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>TURMA</th>
                <th>DISCIPLINA</th>
                <th>NOTA</th>
                <th>PESO</th>
                <th>TIPO AVALIAÇÃO</th>
                <th>DATA AVALIAÇÃO</th>
                <th>OBSERVAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {Notas.map((Notas) => (
                <tr key={Notas.id}>
                  <td>{Notas.nome_aluno} </td>
                  <td>{Notas.descricao_turma} </td>
                  <td>{Notas.nome_disciplina} </td>
                  <td>{Notas.valor_nota} </td>
                  <td>{Notas.peso_avaliacao} </td>
                  <td>{Notas.tipo_avaliacao} </td>
                  <td>{Notas.data_avaliacao} </td>
                  <td>{Notas.observacao} </td>
                  <td>
                    <i
                      class="bi bi-trash"
                      style={{ color: "red" }}
                      onClick={() => handleDelete(Notas.codigo)}
                    ></i>
                  </td>
                  <td>
                    <i
                      class="bi bi-pen"
                      style={{ color: "blue" }}
                      onClick={() => handleEdit(Notas)}
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

export default Matricula;
