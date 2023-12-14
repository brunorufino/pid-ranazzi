const API_BASE_URL = 'http://localhost:3001'

class TurmaService{

    async getAllTurma(){
        try{
            const response = await fetch(`${API_BASE_URL}/turma`)
            if(!response.ok){
                throw new Error('Erro ao buscar turma')
            }
            else{
                
                const dados = await response.json()
              return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar turma: ', erro)
        }
    }

  
    
    async deleteTurma(codigo){
        try {
            const response = await fetch(`${API_BASE_URL}/turma/${codigo}`,{
                method:"DELETE",
            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar turma");
            }
        } catch (error) {
            console.error('Erro ao deletar turma', error);
            throw error;
        }
     }

     async createTurma(DadosTurma){
            try {
                const response = await fetch(`${API_BASE_URL}/turma`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(DadosTurma)
                })
                if(!response.ok){
                   
                    throw new Error('Erro ao cadastrar')
                }
            } catch (error) {
                throw error;
            }
     }

     async updateTurma(dados){
        
        try {
            const response = await fetch(`${API_BASE_URL}/turma`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dados)
            })
            if(!response.ok){
               
                throw new Error('Erro ao atualizar')
            }
        } catch (error) {
            throw error;
        }
 }
 
    async filtrar(filtroData){
        try {
            const response = await fetch(`${API_BASE_URL}/turma/filtrar`,{
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
}

module.exports = TurmaService