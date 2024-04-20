import "./notas.css";
import NotasService from "../services/NotasService";
import { useEffect, useState } from "react";

const NotaService = new NotasService();

function Notass() {

  const [NotasData, setNotasData] = useState({});
  const [Notas, setNotas] = useState([])
  const [NotasNome, setNotasNome] =  useState('');

  const handleSubmit = async (event)=>{
    event.preventDefault();
 
    try {
        await NotaService.createNota(NotasData)
        alert('Notass cadastrado com sucesso!')
        await carregaNotass();  
    } catch (error) {
      alert('Erro ao Alterar!')
    }
  }
  
  const carregaNotass = async ()=>{
    try {         
        const dados = await NotaService.getAllNota();

        console.log(dados);
        setNotas(dados);

    } catch (error) {
        console.error("Erro ao carregar Notass")
    }
};

useEffect(()=>{
  
  carregaNotass();
},[]);


  
  const handleInputChange =(event) => {
    const {name, value} = event.target;
    setNotasData({...NotasData,[name]:value})
  }                                                       

  const handleEdit= async (Notass)=>{
    const btnCadastrar = document.getElementById('CADSATRAR');
    const campoCodigo = document.getElementById('codigo');

    btnCadastrar.disabled = true;
    campoCodigo.disabled = true;

    document.getElementById('codigo').value = Notass.codigo;
    document.getElementById('anoNotass').value = Notass.anoNotass;
    document.getElementById('descricao').value = Notass.descricao;
    document.getElementById('qtde').value = Notass.qtde;

    
}
const handleDelete = async (codigo) =>{
  const confirmacao = window.confirm("Confirma a exclusão?");

  if(confirmacao){
    try {
       await NotaService.deleteNota(codigo);
       await carregaNotass();
       alert("Notass excluída com sucesso!")
    } catch (error) {
        alert("Erro ao excluir Notass!!")
    }
  }
     
}


const atualizarNotass = async () => {
    

  const codigo = document.getElementById('codigo').value
  const descricao = document.getElementById('descricao').value
  const anoNotas = document.getElementById('anoNotass').value;
  const qtde = document.getElementById('qtde').value;
  
  const dados = {
    codigo: codigo,
    descricao: descricao,
    anoNotass: anoNotas,
    qtde: qtde


  }
  
  console.log(dados)
  try {
    await NotaService.updateNotass(dados);
    alert('Notass atualizado com sucesso!')
    await carregaNotass();
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
  carregaNotass();
};

async function getByNome(nomee) {

  const nome = {
    nome: `${nomee}`
  }


  try {

    const dados = await NotaService.filtrar(nome)

    if (dados.length > 0) {

      const dadosFiltroNome = dados.map((Notass) => (
        {
          codigo: `${Notass.codigo}`,
          descricao: `${Notass.descricao}`,
          anoNotass: `${Notass.anoNotass}`,
          qtde: `${Notass.qtde}`,
          
        }
      ));
       
      setNotas(dadosFiltroNome);
  
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
        <h5 class="card-header">GERENCIAR NotasS</h5>
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
                  value={NotasData.codigo}
                  
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
                  value={NotasData.descricao}
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
              <span>Notas&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  id="descricao"
                  name="descricao"
                  value={NotasData.descricao}
                />
                 &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"></i>
              </div>
            </div>

            <div className="col-1">
              <span>Notas&nbsp;<b>*</b></span>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder="0 A 10"
                  id="qtde"
                  name="qtde"
                  value={NotasData.qtde}
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
                  value={NotasData.descricao}
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
                value={NotasData.descricao}
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
                value={NotasData.descricao}
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
                  value={NotasData.qtde}
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
            <button type="button" class="btn btn-info cor_botao"  onClick={() => atualizarNotass()}>
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
                      value={Notass.nome}
                      onChange={handleInputChange}
                      onBlur={(e) => setNotasNome(e.target.value)}
                    />
                      &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(NotasNome)} ></i> &nbsp;&nbsp;&nbsp;
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
                      value={Notass.nome}
                      onChange={handleInputChange}
                      onBlur={(e) => setNotasNome(e.target.value)}
                    />
                      &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(NotasNome)} ></i> &nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <div class="col-3">
                  <div class="input-group flex-nowrap">
                    <input
                      name="nomePesquisa"
                      id="nomePesquisa"
                      type="text"
                      class="form-control"
                      placeholder="Pesquisar por Notass"
                      value={Notass.nome}
                      onChange={handleInputChange}
                      onBlur={(e) => setNotasNome(e.target.value)}
                    />
                      &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"  onClick={()=>getByNome(NotasNome)} ></i>
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
                          <th>TURMA</th>
                          <th>DISCIPLINA</th>
                          <th>NOTA</th>
                          <th>DATA</th>
                          <th>TIPO AVALIAÇÃO</th>
                          <th>DATA AVALIAÇÃO</th>
                          <th>OBSERVAÇÃO</th>
                      </tr>
                  </thead>
        <tbody>
        {
            Notas.map((Notas)=>(
                <tr key={Notas.codigo}>
                    <td>{Notas.nome_aluno} </td>
                    <td>{Notas.descricao_turma} </td>
                    <td>{Notas.nome_disciplina} </td>
                    <td>{Notas.valor_nota} </td>
                    <td>{Notas.data_avaliacao} </td>
                    <td>{Notas.tipo_avaliacao} </td>
                    <td>{Notas.peso_avaliacao} </td>
                    <td>{Notas.observacao} </td>
                    <td><i class="bi bi-trash" style={{ color: 'red' }} onClick={()=>handleDelete(Notas.codigo)}></i></td>
                    <td><i class="bi bi-pen" style={{ color: 'blue' }} onClick={()=>handleEdit(Notas)}></i></td>
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

export default Notass;
