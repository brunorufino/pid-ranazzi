class Validacoes{

   validaNome(nome,id) {
    let regex = /^\D{3,20}$/

    let elemento = document.getElementById(`${id}`)

    if(regex.test(nome)){
        if(elemento.classList.contains('vermelho')){
            elemento.classList.remove('vermelho')
        }
        return
    }
    else{
        elemento.classList.add('vermelho')
    }
    }


    validaCarga(carga,id) {
        let regex = /^\d{1,3}$/
    
        let elemento = document.getElementById(`${id}`)
    
        if(regex.test(carga)){
            if(elemento.classList.contains('vermelho')){
                elemento.classList.remove('vermelho')
            }
            return
        }
        else{
            elemento.classList.add('vermelho')
        }
        }

        validaTexto(texto,id) {
            let regex = /^[a-zA-ZÀ-ú0-9 ]{3,60}$/

        
            let elemento = document.getElementById(`${id}`)
        
            if(regex.test(texto)){
                if(elemento.classList.contains('vermelho')){
                    elemento.classList.remove('vermelho')
                }
                return
            }
            else{
                elemento.classList.add('vermelho')
            }
            }

}

module.exports = Validacoes