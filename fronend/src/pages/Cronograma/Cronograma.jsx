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
const [Horario, setHorario] = useState('')

  const handleSubmit = async (event)=>{
    event.preventDefault();
    
    const dados = {
      disc_codigo: Codigo_disciplina,
      tur_codigo: Codigo_turma,
      data: Data,
      horario: Horario
    }

    try {
    
        await cronogramaService.createCronograma(dados)
        alert('Horário cadastrado com sucesso!')
        await carregaCronograma();  
    } catch (error) {
      alert('Erro ao Cadastrar!')
    }
  }
  


  const updateCronograma = async () => {
    

    alert("CHegou até aqui? ");

    const codigo_disciplina = document.getElementById('disc_codigo').value;
    const codigo_turma = document.getElementById('tur_codigo').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;


 

    const dados = {
      disc_codigo: codigo_disciplina,
      tur_codigo: codigo_turma,
      data: data,
      horario: horario
    }

    try {
      await cronogramaService.updateCronograma(dados);
      alert('Cronograma atualizado com sucesso!')
      await carregaCronograma();
    } catch (error) {
      console.log('Erro ao atualizar: ', error)
      alert('Erro ao atualizar!')
    }
  }




const handleDelete = async (codigo_disciplina, codigo_turma) =>{

    const dados = {
      disc_codigo: codigo_disciplina,
      tur_codigo: codigo_turma
    }
    try {
        await cronogramaService.deleteCronograma(dados)
        alert('Horário cadastrado deletado com sucesso!')
        await carregaCronograma();  
    } catch (error) {
      alert('Erro ao realizar a exclusão!')
    }


}


const handleEdit= async (codigo_disc, codig_tur, data, horario)=>{
 

  alert(data);

  document.getElementById('disc_codigo').value = codigo_disc;
  document.getElementById('tur_codigo').value = codig_tur;
  document.getElementById('data').value = data;
  document.getElementById('horario').value = horario;

  
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
          <div>

          </div>
          
          <div className="row">&nbsp;</div>
          <div className="col-3">
              <span>HORÁRIO</span>
              <div class="input-group flex-nowrap">
                <input
                  name="horario"
                  id="horario"
                  type="text"
                  class="form-control"
                  placeholder="00:00"
                  value={cronogramaData.horario}
                  onChange={(e)=> setHorario(e.target.value) } 
                  required
                />
              </div>
            </div>
      
        </div>

        <div className="row aling-itens-botoes">
          <div className="col-3">
            <button type="submit" id="CADSATRAR" name="" class="btn btn-success">
              <i class="bi bi-bag-plus"></i> &nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-3">
            <button type="button" class="btn btn-info cor_botao"   onClick={() => updateCronograma()} >
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
                          <th>HORÁRIO</th>
                          <th>CARGA HORÁRIA</th>
                          <th>OBSERVAÇÃO</th>
                          <th visible="false">Turma Código</th>
                      </tr>
                  </thead>
        <tbody>
        {
            
            cronograma.map((cronograma)=>(


                <tr key={cronograma.disc_codigo}>
                
                    <td>{cronograma.data_formatada} </td>
                    <td>{cronograma.turma_descricao} </td>
                    <td>{cronograma.anoTurma}</td>  
                    <td>{cronograma.qtde} </td>
                    <td>{cronograma.disciplina_nome} </td>
                    <td>{cronograma.hora_formatada} </td>
                    <td>{cronograma.qtde} </td>
                    <td>{cronograma.observacao} </td>
                    <td> {cronograma.tur_codigo} </td>
                    <td><i class="bi bi-trash" style={{ color: 'red' }}  onClick={ () => handleDelete(cronograma.disc_codigo, cronograma.tur_codigo)} ></i></td>
                    <td><i class="bi bi-pen" style={{ color: 'blue' }}   onClick={ () => handleEdit(cronograma.disc_codigo, cronograma.tur_codigo,cronograma.data_formatada,cronograma.hora_formatada)} ></i></td>
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
