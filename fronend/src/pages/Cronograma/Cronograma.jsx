import "./CadastroTurma.css";
import TurmaService from "../../pages/services/TurmaService";
import DisciplinaService from '../services/DisciplinaServices'
import { useEffect, useState } from "react";

const turmaService = new TurmaService();
const disciplinaService = new DisciplinaService();

function CadastroTurma() {

  const [turmaData, setTurmaData] = useState({});
  const [turma, setTurma] = useState([])
  const [turmaNome, setTurmaNome] =  useState('');
  const [lista, setLista] = useState([])
  const [filtroNome, setFiltroNome] = useState([])
  const [codDisciplina, setCodDisciplina] = useState('0')
  const [nomeDisciplina, setNomeDisciplina] = useState('')
  const [filtro, setFiltro] = useState([])
 
  const handleSubmit = async (event)=>{
    event.preventDefault();
 
    try {
        await turmaService.createTurma(turmaData)
        alert('Horário cadastrado com sucesso!')
        await carregaTurma();  
    } catch (error) {
      alert('Erro ao Alterar!')
    }
  }
  
  const carregaTurma = async ()=>{
    try {         
        const dados = await turmaService.getAllTurma();
        setTurma(dados);

    } catch (error) {
        console.error("Erro ao carregar Turma")
    }
};

useEffect(()=>{
  
  carregaTurma();
},[]);


  
  const handleInputChange =(event) => {
    const {name, value} = event.target;
    setTurmaData({...turmaData,[name]:value})
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


  const handleEdit= async (turma)=>{
    const btnCadastrar = document.getElementById('CADSATRAR');
    const campoCodigo = document.getElementById('codigo');

    btnCadastrar.disabled = true;
    campoCodigo.disabled = true;

    document.getElementById('codigo').value = turma.codigo;
    document.getElementById('anoTurma').value = turma.anoTurma;
    document.getElementById('descricao').value = turma.descricao;
    document.getElementById('qtde').value = turma.qtde;

    
}
const handleDelete = async (codigo) =>{
  const confirmacao = window.confirm("Confirma a exclusão?");

  if(confirmacao){
    try {
       await turmaService.deleteTurma(codigo);
       await carregaTurma();
       alert("Turma excluída com sucesso!")
    } catch (error) {
        alert("Erro ao excluir turma!!")
    }
  }
     
}


const atualizarTurma = async () => {
    
  
  const codigo = document.getElementById('codigo').value
  const descricao = document.getElementById('descricao').value
  const anoTurma = document.getElementById('anoTurma').value;
  const qtde = document.getElementById('qtde').value;
  
  const dados = {
    codigo: codigo,
    descricao: descricao,
    anoTurma: anoTurma,
    qtde: qtde
  }
  
  console.log(dados)
  try {
    await turmaService.updateTurma(dados);
    alert('Turma atualizado com sucesso!')
    await carregaTurma();
  } catch (error) {
    alert('Erro ao atualizar! ')
    console.log('Erro ao atualizar: ', error)
  }
}



const handleReset = () => {
  const inputElements = document.querySelectorAll("input, IMaskInput");

  inputElements.forEach((input) => {
      input.value = "";
  });
  window.location.reload();
  carregaTurma();
};

async function getByNome(nomee) {

  const nome = {
    nome: `${nomee}`
  }


  try {

    const dados = await turmaService.filtrar(nome)

    if (dados.length > 0) {

      const dadosFiltroNome = dados.map((turma) => (
        {
          codigo: `${turma.codigo}`,
          descricao: `${turma.descricao}`,
          anoTurma: `${turma.anoTurma}`,
          qtde: `${turma.qtde}`,
          
        }
      ));
       
      setTurma(dadosFiltroNome);
  
    }
    else {
      
    }
    
  }
  catch (erro) {

  }
  
}

  return (

    <form className="alinhamento" onSubmit={handleSubmit}>
      <div class="card">
        <h5 class="card-header">GERENCIAR CRONOGRAMA</h5>
        <div class="card-body ">
          <div className="row">
            
          </div>
          <div className="row">
            <div className="col-3">
              <span>DISCIPLINA</span>
              <select class="form-control" id="anoTurma" name="anoTurma" onChange={handleInputChange} value={turmaData.anoTurma}>
              {
                          lista.map((disciplina) => (
                            
                            <option value= {disciplina.codigo}> {disciplina.nome} </option>
                          ))
                }
             </select>
            </div>
            <div className="col-3">
              <span>TURMA</span>
              <select class="form-control" id="anoTurma" name="anoTurma" onChange={handleInputChange} value={turmaData.anoTurma}>
              {
                    turma.map((turma)=>(
            
                        <option value={turma.codigo}>{turma.descricao}</option>
                ))
                }
             </select>
            </div>
            <div className="col-3">
              <span>DATA</span>
              <div class="input-group flex-nowrap">
                <input
                  name="dataNascimento"
                  id="dataNascimento"
                  type="date"
                  class="form-control"
                  placeholder="dd/mm/aaaa"
                  
                  onChange={handleInputChange}
               
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
         

          
          </div>

          <div className="row">&nbsp;</div>

      
        </div>

        <div className="row aling-itens-botoes">
          <div className="col-3">
            <button type="submit" id="CADSATRAR" name="" class="btn btn-success">
              <i class="bi bi-bag-plus"></i> &nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-3">
            <button type="button" class="btn btn-info cor_botao"  onClick={() => atualizarTurma()}>
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
        <div className="row">
            <h5 className="hf">Filtro de Buscas:</h5>
        </div>
      </div>

      <div class="container mt-4">
          <div class="row">
            <div class="col-4">
                <div class="input-group flex-nowrap">
                  <input
                    name="nomePesquisa"
                    id="nomePesquisa"
                    type="text"
                    class="form-control"
                    placeholder="Pesquisar por disciplina"
                    value={turma.nome}
                    onChange={handleInputChange}
                    onBlur={(e) => setTurmaNome(e.target.value)}
                  />
                    &nbsp; &nbsp;
                  <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(turmaNome)} ></i>
              </div>
              </div>
            </div>
          <div class="table-responsive">
              <table class="table">
                  <thead>
                      <tr>
                          <th>CÓDIGO</th>
                          <th>DESCRIÇÃO</th>
                          <th>ANO TURMA</th>
                          <th>QUANTIDADE</th>
                     
                      </tr>
                  </thead>
        <tbody>
        {
            turma.map((turma)=>(
                <tr key={turma.codigo}>
                    <td>{turma.codigo} </td>
                    <td>{turma.descricao} </td>
                    <td>{turma.anoTurma} </td>
                    <td>{turma.qtde} </td>
                  
                    <td><i class="bi bi-trash" style={{ color: 'red' }} onClick={()=>handleDelete(turma.codigo)}></i></td>
                    <td><i class="bi bi-pen" style={{ color: 'blue' }} onClick={()=>handleEdit(turma)}></i></td>
                </tr>
            ))
        }
        </tbody>
        </table>
          </div>
      </div>
    </form>
      



  );
}

export default CadastroTurma;
