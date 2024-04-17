import "./notas.css";
import TurmaService from "../services/TurmaService";
import { useEffect, useState } from "react";

const turmaService = new TurmaService();

function Notas() {


  const [turmaData, setTurmaData] = useState({});
  const [turma, setTurma] = useState([])
  const [turmaNome, setTurmaNome] =  useState('');

  const handleSubmit = async (event)=>{
    event.preventDefault();
 
    try {
        await turmaService.createTurma(turmaData)
        alert('Turma cadastrado com sucesso!')
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
        <h5 class="card-header">GERENCIAR NOTAS</h5>
        <div class="card-body ">
          <div className="row">
            <div className="col-3">
              <span>ALUNO&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="codigo"
                  name="codigo"
                  value={turmaData.codigo}
                  
                />
                &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>
            <div className="col-3">
              <span>DISCIPLINA&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="descricao"
                  name="descricao"
                  value={turmaData.descricao}
                />
                 &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>
          </div>
          <div className="row">
          </div>
          <div className="row">
            <div className="col-3">
              <span>TURMA&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="descricao"
                  name="descricao"
                  value={turmaData.descricao}
                />
                 &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>

            <div className="col-1">
              <span>NOTA&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder="0 A 10"
                  id="qtde"
                  name="qtde"
                  value={turmaData.qtde}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
     

          <div className="row">
          <div className="col-3">
              <span>DATA AVALIAÇÃO&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="date"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="descricao"
                  name="descricao"
                  value={turmaData.descricao}
                />
              </div>
            </div>
            <div className="col-1">
              <span>PROVA</span>
              <div class="input-group flex-nowrap">
              <input
                type="radio"
                class="form-check-input"
                onChange={handleInputChange}
                id="checkboxId" 
                name="checkboxName" 
                value={turmaData.descricao}
               />
              </div>
            </div>
            <div className="col-1">
              <span>TRABALHO</span>
              <div class="input-group flex-nowrap">
              <input
                type="radio"
                class="form-check-input"
                onChange={handleInputChange}
                id="checkboxId" 
                name="checkboxName" 
                value={turmaData.descricao}
               />
              </div>
            </div>
            <div className="col-1">
              <span>PESO&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder="0 A 10"
                  id="qtde"
                  name="qtde"
                  value={turmaData.qtde}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
              
          <div className="row  mt-5">
            <div id="observacao">
              <label htmlFor="obs" class="obs">
                OBSERVAÇÕES <span className="span">*</span>
              </label>
              <div className="input-group flex-nowrap">
                <textarea name="observacao" id="obs" cols="70" rows="4">

                </textarea>
              </div>
            </div>
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
      
      </div>

      <div class="container mt-4">
      <div className="row">
            <h5 className="hf">Filtro de Buscas:</h5>

        </div>
        <div className="row">
        &nbsp;&nbsp;

        </div>
          <div class="row">
            <div class="col-3">
                  <div class="input-group flex-nowrap">
                    <input
                      name="nomePesquisa"
                      id="nomePesquisa"
                      type="text"
                      class="form-control"
                      placeholder="Pesquisar por aluno"
                      value={turma.nome}
                      onChange={handleInputChange}
                      onBlur={(e) => setTurmaNome(e.target.value)}
                    />
                      &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(turmaNome)} ></i> &nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <div class="col-3">
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
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(turmaNome)} ></i> &nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <div class="col-3">
                  <div class="input-group flex-nowrap">
                    <input
                      name="nomePesquisa"
                      id="nomePesquisa"
                      type="text"
                      class="form-control"
                      placeholder="Pesquisar por turma"
                      value={turma.nome}
                      onChange={handleInputChange}
                      onBlur={(e) => setTurmaNome(e.target.value)}
                    />
                      &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(turmaNome)} ></i>
                </div>
              </div>
            </div>
            <div className="row">
            &nbsp;&nbsp;&nbsp;
            </div>
          <div class="table-responsive">
              <table class="table">
                  <thead>
                      <tr>
                          <th>ALUNO</th>
                          <th>DISCIPLINA</th>
                          <th>TURMA</th>
                          <th>NOTA</th>
                          <th>TIPO AVALIAÇÃO</th>
                          <th>DATA AVALIAÇÃO</th>
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

export default Notas;
