const API_BASE_URL = 'http://localhost:3001'

class CronogramaService{

    async getAll(){
        try{
            const response = await fetch(`${API_BASE_URL}/cronograma`)
            if(!response.ok){
                throw new Error('Erro ao buscar cronograma')
            }
            else{
                
                const dados = await response.json()
              return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar cronograma: ', erro)
        }
    }

    async deleteCronograma(dados){
        try {
            const response = await fetch(`${API_BASE_URL}/cronograma`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dados)
            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar cronograma");
            }
        } catch (error) {
            console.error('Erro ao deletar cronograma', error);
            throw error;
        }
     }

     async createCronograma(DadosCronograma){
            
       
        try {
                const response = await fetch(`${API_BASE_URL}/cronograma`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    
                    body:JSON.stringify(DadosCronograma)
                })
                if(!response.ok){
                   
                    throw new Error('Erro ao cadastrar')
                }
            } catch (error) {
                throw error;
            }
     }

     async updateCronograma(dados){
        
        try {
            const response = await fetch(`${API_BASE_URL}/cronograma`,{
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
            const response = await fetch(`${API_BASE_URL}/cronograma/filtrar`,{
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

module.exports = CronogramaService