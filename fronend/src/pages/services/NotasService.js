const API_BASE_URL = 'http://localhost:3001'

class NotaService{

    async getAllNota(){
        try{
            const response = await fetch(`${API_BASE_URL}/notas`)
            if(!response.ok){
                throw new Error('Erro ao buscar Nota')
            }
            else{
                
                const dados = await response.json()
              return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar Nota: ', erro)
        }
    }

  
    
    async deleteNota(codigo){
        try {
            const response = await fetch(`${API_BASE_URL}/notas/${codigo}`,{
                method:"DELETE",
            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar Nota");
            }
        } catch (error) {
            console.error('Erro ao deletar Nota', error);
            throw error;
        }
     }

     async createNota(DadosNota){
            try {
                const response = await fetch(`${API_BASE_URL}/notas`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(DadosNota)
                })
                if(!response.ok){
                   
                    throw new Error('Erro ao cadastrar')
                }
            } catch (error) {
                throw error;
            }
     }

     async updateNota(dados){
        
        try {
            const response = await fetch(`${API_BASE_URL}/notas`,{
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
            const response = await fetch(`${API_BASE_URL}/notas/filtrar`,{
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

module.exports = NotaService