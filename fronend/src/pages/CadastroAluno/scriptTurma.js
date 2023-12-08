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

     validaCPF(cpf, id) {
        let regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    
        let elemento = document.getElementById(`${id}`);
    
        if (regex.test(cpf)) {
            if (elemento.classList.contains('vermelho')) {
                elemento.classList.remove('vermelho');
            }
            return;
        } else {
            elemento.classList.add('vermelho');
        }
    }
    
     

validaTexto(texto,id) {
    let regex = /^[a-zA-Z0-9 ]{3,60}$/


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

verifica(){
    let erro = document.querySelectorAll('.vermelho')

    erro.forEach((item)=>{
        item.value = ''
    })
}


}

module.exports = Validacoes