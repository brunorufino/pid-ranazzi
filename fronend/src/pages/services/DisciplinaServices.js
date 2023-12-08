const API_BASE_URL = 'http://localhost:3001'

class DisciplinaService{

    async getAllDisciplina(){
        try{
            const response = await fetch(`${API_BASE_URL}/disciplina`)
            if(!response.ok){
                throw new Error('Erro ao buscar disciplina')
            }
            else{
                
                const dados = await response.json()
              return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar disciplinas: ', erro)
        }
    }

    async getId_Disciplina(codigo){
        try{
            const response = await fetch(`${API_BASE_URL}/disciplina/${codigo}`)
            if(!response.ok){
                throw new Error('Erro ao buscar disciplina pelo código')
            }
            else{
                
                const dados = await response.json()
                return dados
            }
        }
        catch(erro){
            console.error('Erro ao buscar disciplinas: ', erro)
        }
    }

    async getByNome(nome){
        try{
            const response = await fetch(`${API_BASE_URL}/disciplina/nome`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nome)
            })


            if(!response.ok){
                throw new Error('Erro ao buscar disciplina')
            }
            else{
               const dados = await response.json()
                return dados
            }
        }
        catch(erro){
            throw erro
        }
    }
    
    async deleteDisciplina(codigo){
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina/${codigo}`,{
                method:"DELETE",
            })
            if(!response.ok){
                
                throw new Error ("Erro ao deletar disciplina");
            }
        } catch (error) {
            console.error('Erro ao deletar disciplina', error);
            throw error;
        }
     }

     async createDisciplina(DadosDisciplina){
            try {
                const response = await fetch(`${API_BASE_URL}/disciplina`,{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(DadosDisciplina)
                })
                if(!response.ok){
                   
                    throw new Error('Erro ao cadastrar')
                }
            } catch (error) {
                throw error;
            }
     }

     async atualizarDisciplina(codigo,dados){
        
        try {
            const response = await fetch(`${API_BASE_URL}/disciplina/${codigo}`,{
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
}

module.exports = DisciplinaService