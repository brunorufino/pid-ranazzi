import "./CadastroFuncionario.css";
import FuncionarioService from "../../pages/services/funcionarioService";
import Validacoes from "./scriptFuncionario";
import { useEffect, useState } from "react";


const funcionarioService = new FuncionarioService();
const validacoes = new Validacoes();

function FormFuncionario() {

  
  const [funcionarioData, setFuncionarioData] = useState({});



    const handleSubmit = async (event)=>{
      event.preventDefault();
   
      try {
         
          await funcionarioService.createFuncionario(funcionarioData)
          alert('Funcionario cadastrado com sucesso!')
          await carregaFuncionario();
      } catch (error) {
        alert('Erro ao Cadastrar novo funcionário!')
      }
    }
    


  

  
    const handleBlur = (event) => {
      //const { name, value } = event.target;
    };


  const handleInputChange =(event) => {
    const {name, value} = event.target;
    setFuncionarioData({...funcionarioData,[name]:value})
  }                                                       

const [funcionario, setFuncionario] = useState([])
  
    const carregaFuncionario = async ()=>{
        try {         
            const dados = await funcionarioService.getAllFuncionarios();
            setFuncionario(dados);

        } catch (error) {
            console.error("Erro ao carregar funcionário")
        }
    };

    useEffect(()=>{
            carregaFuncionario(); 
    },[]);

    const handleDelete = async (codigo) =>{
         await funcionarioService.deleteFuncionario(codigo);
         await carregaFuncionario();
    }
   
    const handleEdit= async (funcionario)=>{
      const btnCadastrar = document.getElementById('CADASTRAR');
      const campoCodigo = document.getElementById('codigo');

      campoCodigo.disabled = true;
      btnCadastrar.disabled = true;

      document.getElementById('codigo').value = funcionario.codigo;
      document.getElementById('nome').value = funcionario.nome;
      document.getElementById('cpf').value = funcionario.cpf;
      document.getElementById('rg').value = funcionario.rg;
      document.getElementById('rua').value = funcionario.rua;
      document.getElementById('telefone').value = funcionario.telefone;
      document.getElementById('cep').value = funcionario.cep;
      document.getElementById('numero').value = funcionario.numero;
      document.getElementById('email').value = funcionario.email;
      document.getElementById('cidade').value = funcionario.cidade;
      document.getElementById('dataNascimento').value = funcionario.dataNascimento;
      document.getElementById('dataAdmissao').value = funcionario.dataAdmissao;
      document.getElementById('codDepartamento').value = funcionario.codDepartamento;
      var sexo = document.getElementById('genero' + funcionario.genero);
      
      if(sexo){
          sexo.click();
      }

      
  }

  const getByCPF = async() =>{


    try {
      const cpf = document.getElementById('cpf').value;

      /** Captura os dados por CPF e retorna em dados */
      const dados = await funcionarioService.getByDocument(cpf);
    
      
       document.getElementById('codigo').value = dados.codigo;
       document.getElementById('telefone').value  = dados.telefone
       document.getElementById('nome').value  = dados.nome
       document.getElementById('rg').value  = dados.rg; 
       document.getElementById('rua').value  = dados.rua;
       document.getElementById('cep').value  = dados.cep;
       document.getElementById('numero').value  = dados.numero;
       document.getElementById('email').value  = dados.email;
       document.getElementById('cidade').value  = dados.cidade
       document.getElementById('dataNascimento').value  = dados.dataNascimento
       document.getElementById('dataAdmissao').value = dados.dataAdmissao
       document.getElementById('codDepartamento').value = dados.codDepartamento
       const sexo = document.getElementById('genero' + dados.genero).value;
       sexo.click();

     
    } catch (error) {
      
    }
  
  }


  const atualizarFuncionario = async () => {
    
  
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const rua = document.getElementById('rua').value
    const telefone = document.getElementById('telefone').value
    const cep = document.getElementById('cep').value
    const numero = document.getElementById('numero').value
    const email = document.getElementById('email').value
    const cidade = document.getElementById('cidade').value
    const dataNascimento = document.getElementById('dataNascimento').value
    const dataAdmissao = document.getElementById('dataAdmissao').value
    const codDepartamento = document.getElementById('codDepartamento').value
    const genero = document.getElementById('generoMASCULINO').value
   
    const dados = {
      codigo: codigo,
      nome: nome,
      rg: rg,
      cpf: cpf,
      rua: rua,
      telefone: telefone,
      cep: cep,
      numero: numero,
      email: email,
      cidade: cidade,
      dataNascimento: dataNascimento,
      dataAdmissao: dataAdmissao,
      codDepartamento: codDepartamento,
      genero: genero
    }


    try {
      await funcionarioService.updateFuncionario(dados);
      alert('Funcionário atualizado com sucesso!')
      await carregaFuncionario();
    } catch (error) {
      console.log('Erro ao atualizar: ', error)
      alert('Erro ao atualizar!')
    }
  }

  function validarCPF(cpf,id){
    validacoes.validaCPF(cpf,id)
  }

  return (
    <div>
    <form className="alinhamento" onSubmit={handleSubmit}>
      <div class="card">
        <h5 class="card-header">GERENCIAR FUNCIONÁRIO</h5>
        <div class="card-body ">
          <div className="row">
            <div className="col-2">
              <span>CÓD. FUNCIONÁRIO </span>
              <div class="input-group flex-nowrap">
                <input id="codigo" name="codigo" type="number" class="form-control" placeholder="" value={funcionarioData.codigo} onChange={handleInputChange}/>
               
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>
                NOME <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="nome"
                  id="nome"
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={funcionarioData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <span>
                RG <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="rg"
                  id="rg"
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={funcionarioData.rg}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-2">
              <span>
                CPF <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="cpf"
                  id="cpf"
                  type="text"
                  class="form-control"
                  placeholder="999.999.999-00"
                  value={funcionarioData.cpf}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyUp={(e)=> validarCPF(e.target.value,'cpf')}
                  maxLength="14"
                  mask="999.999.999-99"
                  maskChar="_"
                  required
                />
                 &nbsp; &nbsp;
                <i class="bi bi-search my-custom-icon"  onClick={() => getByCPF()} ></i>
              </div>
            </div>
            <div className="col-2">
              <span>
                DATA NASCIMENTO <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="dataNascimento"
                  id="dataNascimento"
                  type="date"
                  class="form-control"
                  placeholder="dd/mm/aaaa"
                  value={funcionarioData.dataNascimento}
                  onChange={handleInputChange}
               
                  required
                />
              </div>
            </div>
            <div className="col-4">
              <span>
                SEXO <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input name="genero" id="generoMASCULINO" type="radio" value="MASCULINO" onChange={handleInputChange}/>
                <b className="cor_genero">&nbsp;MASCULINO &nbsp;&nbsp;</b>

                <input
                  name="genero"
                  id="generoFEMININO"
                  type="radio"
                  value="FEMININO"
                  onChange={handleInputChange}
                  required
                />
                <b className="cor_genero">&nbsp;FEMININO</b>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <span>
                RUA <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="rua"
                  id="rua"
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={funcionarioData.rua}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-3">
              <span>
                NÚMERO <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="numero"
                  id="numero"
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={funcionarioData.numero}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <span>
                CIDADE <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="cidade"
                  id="cidade"
                  type="text"
                  class="form-control"
                  placeholder=""
                  onChange={handleInputChange}
                  value={funcionarioData.cidade}
                  required
                />
              </div>
            </div>
            <div className="col-3">
              <span>
                ESTADO <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <select class="form-control" id="estado" name="estado"   value={funcionarioData.estado} onChange={handleInputChange}>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <span>CEP</span>
              <div class="input-group flex-nowrap">
                <input
                  name="cep"
                  id="cep"
                  type="number"
                  class="form-control"
                  placeholder="99999-000"
                  onChange={handleInputChange}
                  value={funcionarioData.cep}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <span>
                E-MAIL <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="email"
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="example@example.com"
                  onChange={handleInputChange}
                  value={funcionarioData.email}
                  required
                />
              </div>
            </div>
            <div className="col-3">
              <span>
                TELEFONE <b>*</b>
              </span>
              <div class="input-group flex-nowrap">
                <input
                  name="telefone"
                  id="telefone"
                  type="number"
                  class="form-control"
                  placeholder="(99) 99999-9999"
                  onChange={handleInputChange}
                  value={funcionarioData.telefone}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">&nbsp;</div>
          <div className="card">
            <h5 class="card-header">DEPARTAMENTO</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-2">
                  <span>CÓD. SETOR</span>
                  <div class="input-group flex-nowrap">
                    <input type="number" name="codDepartamento" id="codDepartamento" class="form-control" placeholder="" onChange={handleInputChange}/>
                    &nbsp; &nbsp;
                    <i class="bi bi-search my-custom-icon"></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <span>
                    DESCRIÇÃO <b>*</b>
                  </span>
                  <div class="input-group flex-nowrap">
                    <input
                      name="descricao"
                      id="descricao"
                      type="text"
                      class="form-control"
                      placeholder=""
                      onChange={handleInputChange}
                      value={funcionarioData.codDepartamento}
                    
                    />
                  </div>
                </div>
                <div className="col-3">
                  <span>
                    DATA ADMISSÃO <b>*</b>
                  </span>
                  <div class="input-group flex-nowrap">
                    <input
                      name="dataAdmissao"
                      id="dataAdmissao"
                      type="date"
                      class="form-control"
                      placeholder="dd/mm/aaaa"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row aling-itens-botoes">
          <div className="col-3">
            <button
              type="submit"
              id="CADASTRAR"
              class="btn btn-success"
            
            >
              <i class="bi bi-bag-plus"></i> &nbsp; CADASTRAR
            </button>
          </div>
          <div className="col-3">
            <button
              type="button"
              id="ATUALIZAR"
              class="btn btn-info cor_botao"
              onClick={() => atualizarFuncionario()}
            >
              <i class="bi bi-pencil"></i>&nbsp; ATUALIZAR
            </button>
          </div>
        
        </div>
        <div className="row">&nbsp;</div></div>
        
     
    </form>
    <div class="container mt-4">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>NOME</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>DATA NASCIMENTO</th>
                        <th>GENERO</th>
                        <th>TELEFONE</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
      <tbody id='lista'>
      {
          funcionario.map((funcionario)=>(
              <tr key={funcionario.codigo}>
                  <td>{funcionario.codigo} </td>
                  <td>{funcionario.nome} </td>
                  <td>{funcionario.cpf} </td>
                  <td>{funcionario.rg} </td>
                  <td>{funcionario.dataNascimento} </td>
                  <td>{funcionario.genero} </td>
                  <td>{funcionario.telefone} </td>
                  <td><i class="bi bi-trash" style={{ color: 'red' }} onClick={()=>handleDelete(funcionario.codigo)}></i></td>
                  <td><i class="bi bi-pen" style={{ color: 'blue' }} onClick={()=>handleEdit(funcionario)}></i></td>
              </tr>
          ))
      }
      </tbody>
      </table>
        </div>
    </div>
      </div>
  );
}

export default FormFuncionario;
