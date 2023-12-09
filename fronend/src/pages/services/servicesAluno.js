const API_BASE_URL = 'http://localhost:3001'

class CadastroAlunoService{

    async getAllCadastroAluno(){
        try{
            const response = await fetch(`${API_BASE_URL}/aluno`)
            if(!response.ok){
                throw new Error('Erro ao buscar o aluno')
            }
            else{
                
                const dados = await response.json()
              return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar aluno: ', erro)
        }
    }

    /**Pesquisa por nome */
    async filtrar(filtroData){
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/filtrar`,{
                method:"POST",
                headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify(filtroData)
            })
            if(!response.ok){

                throw new Error('Erro ao filtrar')
            }
            return await response.json();
        }catch(error){
            throw error;
        }
    }


    async deleteCadastroAluno(cpf){
        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${cpf}`,{
                method:"DELETE",
            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar aluno");
            }
        } catch (error) {
            console.error('Erro ao deletar aluno', error);
            throw error;
        }
     }

     async getByDocument(cpf){

        try {
            const response = await fetch(`${API_BASE_URL}/aluno/${cpf}`,{
                method:"GET",
            })

            if(!response.ok){
                throw new Error('Erro ao buscar aluno pelo cpf')
            }
                const dados = await response.json();
                return dados;
            
        } catch (error) {
            
        }

     }

     async createCadastroAluno(CadastroAlunoData){
            try {
                const response = await fetch(`${API_BASE_URL}/aluno`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(CadastroAlunoData)
                });
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(`Erro ao cadastrar: ${response.status} - ${errorData.message || 'Detalhes indisponíveis'}`)
                   
                }
                
            } catch (error) {
                console.error('Erro ao cadastrar aluno:',error);
                console.log(error)
                throw error;
            }
     }

     async atualizarCadastroAluno(dados){
        
        try {
            const response = await fetch(`${API_BASE_URL}/aluno`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(dados),
            });
            if(!response.ok){
               
                throw new Error('Erro ao atualizar');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CadastroAlunoService;