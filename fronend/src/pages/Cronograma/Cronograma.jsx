import "./CadastroTurma.css";
import TurmaService from "../../pages/services/TurmaService";
import DisciplinaService from '../services/DisciplinaServices'
import CronogramaService from  "../services/CronogramaService";
import { useEffect, useState } from "react";

const turmaService = new TurmaService();
const disciplinaService = new DisciplinaService();
const cronogramaService = new CronogramaService();

function CadastroTurma() {
  const [cronograma,setCronograma] = useState([]);
  const [cronogramaData, setCronogramaData] = useState([]);
  const [turma, setTurma] = useState([])
  const [lista, setLista] = useState([])
  const [filtroNome, setFiltroNome] = useState([])
  const [codDisciplina, setCodDisciplina] = useState('0')
  const [nomeDisciplina, setNomeDisciplina] = useState('')
  const [filtro, setFiltro] = useState([])
 const [Data, setData] = useState('')
 const [Codigo_disciplina, setCodigoDisciplina] = useState('')
 const [Codigo_turma, setCodigoTurma] = useState('')

  const handleSubmit = async (event)=>{
    event.preventDefault();
    
    const dados = {
      disc_codigo: Codigo_disciplina,
      tur_codigo: Codigo_turma,
      data: Data
    }

    try {
    
        await cronogramaService.createCronograma(dados)
        alert('Horário cadastrado com sucesso!')
        await carregaCronograma();  
    } catch (error) {
      alert('Erro ao Cadastrar!')
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



const carregaCronograma = async ()=>{
  try {         
      const dados = await cronogramaService.getAll();
      setCronograma(dados);

  } catch (error) {
      console.error("Erro ao carregar Horario")
  }
};

  
  const handleInputChange =(event) => {
    const {name, value} = event.target;
    console.log({name, value})
    setCronogramaData({...cronogramaData,[name]:value})
   
 console.log(event.target);
  }                                                       


  useEffect(() =>{

    carregaCronograma();
  },[])

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
  },[])





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
              <select class="form-control" id="disc_codigo" name="disc_codigo" onChange={(e)=> setCodigoDisciplina(e.target.value) } value={cronogramaData.disc_codigo}>
              {
                          lista.map((disciplina) => (
                            
                            <option value= {disciplina.codigo}> {disciplina.nome} </option>
                          ))
                }
             </select>
            </div>
            <div className="col-3">
              <span>TURMA</span>
              <select class="form-control" id="tur_codigo" name="tur_codigo"  onChange={(e)=> setCodigoTurma(e.target.value) } value={cronogramaData.tur_codigo}>
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
                  name="data"
                  id="data"
                  type="date"
                  class="form-control"
                  placeholder="dd/mm/aaaa"
                  value={cronogramaData.data}
                  onChange={(e)=> setData(e.target.value) } 
          
                  required
                />
              </div>
            </div>
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
            <button type="button" class="btn btn-info cor_botao"  >
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              value="reset"
              className="btn btn-secondary"
             
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
                    
                  />
                    &nbsp; &nbsp;
                  <i class="bi bi-search my-custom-icon"  ></i>
              </div>
              </div>
            </div>
          <div class="table-responsive">
              <table class="table">
                  <thead>
                      <tr>
                          <th>DATA</th>
                          <th>NOME TURMA</th>
                          <th>ANO TURMA</th>
                          <th>QUANTIDADE</th>
                          <th>NOME DISCIPLINA</th>
                          <th>CARGA HORÁRIA</th>
                          <th>OBSERVAÇÃO</th>
                      </tr>
                  </thead>
        <tbody>
        {
            
            cronograma.map((cronograma)=>(


                <tr key={cronograma.disc_codigo}>
                
                    <td>{cronograma.cro_data} </td>
                    <td>{cronograma.descricao} </td>
                    <td>{cronograma.anoTurma}</td>  
                    <td>{cronograma.qtde} </td>
                    <td>{cronograma.nome} </td>
                    <td>{cronograma.carga} </td>
                    <td>{cronograma.observacao} </td>
                    
                    <td><i class="bi bi-trash" style={{ color: 'red' }}></i></td>
                    <td><i class="bi bi-pen" style={{ color: 'blue' }} ></i></td>
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
