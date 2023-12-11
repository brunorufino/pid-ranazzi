import "./CadastroDisciplina.css";
import Validacoes from "./scriptDisciplina"
import { useState, useEffect } from "react";
import DisciplinaService from '../services/DisciplinaServices'

const disciplinaService = new DisciplinaService()
const validacoes = new Validacoes()

function CadastroDisciplina() {

  const [codDisciplina, setCodDisciplina] = useState('0')
  const [nomeDisciplina, setNomeDisciplina] = useState('')
  const [filtro, setFiltro] = useState([])
  const [filtroNome, setFiltroNome] = useState([])
  const [lista, setLista] = useState([])
  const [disciplinaDate, setDisciplinadate] = useState({

    nome: "",
    carga: "",
    observacao: ""
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDisciplinadate({ ...disciplinaDate, [name]: value })
  }

  const handleSubmit = async () => {

    let erro = document.querySelectorAll('.vermelho')

    if (erro.length < 1) {
      try {
        await disciplinaService.createDisciplina(disciplinaDate)

        limpar()

        alert('Disciplina cadastrada com sucesso!')


      } catch (error) {
        alert('Erro ao cadastrar!')
      }
    }
    else {
      alert('Cadastre todos os campos obrigatórios com dados válidos')
    }
  }

  async function atualizar(cod, nomee, cargaa, observacaoo) {

    const btnAtualizar = document.getElementById('atualizar').disabled = false
    const btnCadastrar = document.getElementById('cadastrar').disabled = true

    const codigo = document.getElementById('cod').value = cod
    const nome = document.getElementById('nome_disciplina').value = nomee
    const carga = document.getElementById('carga').value = cargaa
    const observacao = document.getElementById('obs').value = observacaoo

  }




  const atualizarDisciplina = async () => {


    const codigo = document.getElementById('cod').value
    const nome = document.getElementById('nome_disciplina').value
    const carga = document.getElementById('carga').value
    const observacao = document.getElementById('obs').value

    const dados = {
      codigo: codigo,
      nome: nome,
      carga: carga,
      observacao: observacao
    }


    try {
      await disciplinaService.atualizarDisciplina(codigo, dados)

      limpar()
      alert('Disciplina atualizada com sucesso!')


    } catch (error) {
      alert('Erro ao atualizar! ')
      console.log('Erro ao atualizar: ', error)
    }
  }


  async function disciplina_Id(codigo) {

    try {
      const dados = await disciplinaService.getId_Disciplina(codigo)
      if (dados) {

        const filtroDados = [{
          codigo: `${dados.codigo}`,
          nome: `${dados.nome}`,
          carga: `${dados.carga}`,
          observacao: `${dados.observacao}`
        }]

        setFiltro(filtroDados)

      }
      else {
        alert(`Não existe disciplina com o código: ${codDisciplina}`)
      }

    }
    catch (erro) {
      console.log(erro)
    }
  }

  async function getByNome(nomee) {

    const nome = {
      nome: `${nomee}`
    }


    try {

      const dados = await disciplinaService.getByNome(nome)

      if (dados.length > 0) {

        const dadosFiltroNome = dados.map((disciplina) => (
          {
            codigo: `${disciplina.codigo}`,
            nome: `${disciplina.nome}`,
            carga: `${disciplina.carga}`,
            observacao: `${disciplina.observacao}`
          }
        ))

        setFiltroNome(dadosFiltroNome)



      }
      else {
        alert(`Não existe disciplina com nome: ${nomee}`)
      }

    }
    catch (erro) {

    }
  }



  async function deletar(codigo) {
    
    let confirma = window.confirm('Confirma a exclusão ?')

    if(confirma){
      try {
        await disciplinaService.deleteDisciplina(codigo)
        alert('Disciplina excluida com sucesso!')
  
  
      } catch (error) {
        alert('Erro ao excluir!')
      }
    }

  }


  useEffect(() => {

    const carregaDisciplinas = async () => {

      try {
        const dados = await disciplinaService.getAllDisciplina()

        if (filtro.length < 1 && filtroNome.length < 1) {

          setLista(dados)
        }
        else if (filtroNome.length > 0 && nomeDisciplina != '') {
          setLista(filtroNome)
        }
        else if (filtro.length > 0 && codDisciplina != '') {
          setLista(filtro)
        }
        else {
          setLista(dados)
        }

      }
      catch (erro) {
        alert('Erro ao carregar disciplinas')
      }

    }

    carregaDisciplinas()
  })



  function limpar() {
    const codigo = document.getElementById('cod').value = ''
    const nome = document.getElementById('nome_disciplina').value = ''
    const carga = document.getElementById('carga').value = ''
    const observacao = document.getElementById('obs').value = ''

    const btnCadastrar = document.getElementById('cadastrar').disabled = false
  }

  function validaNome(nome, id) {
    validacoes.validaNome(nome, id)
  }

  function validacarga(carga, id) {
    validacoes.validaCarga(carga, id)
  }

  function validaTexto(texto, id) {
    validacoes.validaTexto(texto, id)
  }

 

  return (
    <form className="alinhamento">
      <div className="card">
        <h5 className="card-header">GERENCIAR DISCIPLINA</h5>
        <div className="card-body">
          <div className="row  mt-3">
            <div className="col-6">
              <label htmlFor="nome_disciplina">NOME DA DISCIPLINA <span className="span">*</span></label>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Português"
                  id="nome_disciplina"
                  name="nome"
                  onChange={handleInputChange}
                  onKeyUp={(e) => validaNome(e.target.value, 'nome_disciplina')}
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="carga">CARGA HORÁRIA (EM HORAS) <span className="span">*</span></label>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: 150"
                  id="carga"
                  name="carga"
                  onChange={handleInputChange}
                  onKeyUp={(e) => validacarga(e.target.value, 'carga')}
                  required
                />
              </div>
            </div>

          </div>

          <div className="row mt-3" id="div_Dis">

            <div className="col-6">
              <label htmlFor="cod">CÓD. DA DISCIPLINA </label>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: 10"
                  id="cod"
                  name="codigo"
                  onChange={(e) => setCodDisciplina(e.target.value)}
                  disabled
                />
              </div>
            </div>
          </div>


          <div className="row  mt-5">
            <div id="observacao">
              <label htmlFor="obs" class="obs">
                OBSERVAÇÕES GERAIS <span className="span">*</span>
              </label>
              <div className="input-group flex-nowrap">
                <textarea name="observacao" id="obs" cols="70" rows="4" onKeyUp={(e) => validaTexto(e.target.value, 'obs')} onChange={handleInputChange}>

                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="centraliza">
          <div className="col-3">
            <button type="submit" id="cadastrar" onClick={handleSubmit} class="btn btn-success">
              <i class="bi bi-bag-plus"></i> &nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-3">
            <button type="submit" id="atualizar" onClick={() => atualizarDisciplina()} class="btn btn-primary">
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>
          <div className="col-3">
            <button type="submit" id="atualizar" onClick={() => limpar()} class="btn btn-dark">
            <i class="bi bi-arrow-repeat"></i>&nbsp; LIMPAR
            </button>
          </div>
        </div>
      </div>

      <h5 className="h5">Filtros de buscas</h5>

      <div className="col-12 d-flex justify-content-around mt-4 mb-4">
        <div className="col-5">
          <label htmlFor="nome_disciplina">BUSCAR DISCIPLINA <span className="span">*</span></label>
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Português"
              id="nome_disciplina"
              name="noome"
              onBlur={(e) => setNomeDisciplina(e.target.value)}
            />
            &nbsp; &nbsp;
            <i onClick={() => getByNome(nomeDisciplina)} class="bi bi-search my-custom-icon pesquisa"></i>
          </div>
        </div>
        <div className="col-5">
          <label htmlFor="cod">CÓD. DA DISCIPLINA </label>
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Ex: 10"
              id="cod"
              name="codigo"
              onChange={(e) => setCodDisciplina(e.target.value)}
            />
            &nbsp; &nbsp;
            <i onClick={() => disciplina_Id(codDisciplina)} class="bi bi-search my-custom-icon pesquisa"></i>
          </div>
        </div>
      </div>




      <div className="table-responsive">
        <table class="table" id="tabela">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Disciplina</th>
              <th scope="col">Carga</th>
              <th scope="col">Observação</th>
            </tr>
          </thead>
          <tbody>
            {
              lista.map((disciplina) => (
                <tr>
                  <td>{disciplina.codigo}</td>
                  <td>{disciplina.nome}</td>
                  <td>{disciplina.carga}</td>
                  <td>{disciplina.observacao}</td>
                  <td><i class="bi bi-trash pesquisa" style={{ color: 'red' }} onClick={() => deletar(disciplina.codigo)}></i></td>
                  <td><i class="bi bi-pen pesquisa" style={{ color: 'blue' }} onClick={() => atualizar(disciplina.codigo, disciplina.nome, disciplina.carga, disciplina.observacao)}></i></td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </form>
  );
}

export default CadastroDisciplina;
