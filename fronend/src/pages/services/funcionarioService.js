const API_BASE_URL = 'http://localhost:3001';

class FuncionarioService{

     async getAllFuncionarios(){

        try {
            const response = await fetch(`${API_BASE_URL}/funcionario`)

            if(!response.ok){
                throw new Error('Erro ao buscar funcionario')
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            
        }

     }

     async filtrar(filtroData){
        try {
            const response = await fetch(`${API_BASE_URL}/funcionario/filtrar`,{
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
        } catch (error) {
            throw error;
        }

 }
     async getByDocument(cpf){

        try {
            const response = await fetch(`${API_BASE_URL}/funcionario/${cpf}`,{
                method:"GET",
            })

            if(!response.ok){
                throw new Error('Erro ao buscar funcionario pelo cpf')
            }
            
            if(response.status === 200){
                const dados = await response.json();
                return dados;
            }
            else{
                alert('fi de aprarifae')
            }
            
        } catch (error) {
            
        }

     }


     async deleteFuncionario(id){
        try {
            const response = await fetch(`${API_BASE_URL}/funcionario/${id}`,{
                method:"DELETE",

            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar Funcionario");
            }
        } catch (error) {
            console.error('Erro ao deletar funcionário', error);
            throw error;
        }
     }

     async createFuncionario(funcionarioData){
            try {
                const response = await fetch(`${API_BASE_URL}/funcionario`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(funcionarioData)
                })
                if(!response.ok){
                   
                    throw new Error('Erro ao cadastrar')
                }
            } catch (error) {
                throw error;
            }

     }
     async updateFuncionario(funcionarioData){
        try {
            const response = await fetch(`${API_BASE_URL}/funcionario`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(funcionarioData)
            })
            if(!response.ok){
               
                throw new Error('Erro ao alterar o Funcionario')
            }
        } catch (error) {
            throw error;
        }

 }
}

export default FuncionarioService;