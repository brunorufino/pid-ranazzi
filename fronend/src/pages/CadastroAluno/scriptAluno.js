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

    validaEmail(email, id) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        let elemento = document.getElementById(`${id}`);

        if (regex.test(email)) {
            if (elemento.classList.contains('vermelho')) {
                elemento.classList.remove('vermelho');
            }
            return;
        } else {
            elemento.classList.add('vermelho');
        }
    }

    validaRua(rua, id) {
      const regexRua = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\s,.'-]+$/;
    
      const campoRua = document.getElementById(id);
    
      if (regexRua.test(rua) && rua.trim() !== "" && !/^\s|\s$/.test(rua)) {
        campoRua.classList.remove("vermelho");
      } else {
        campoRua.classList.add("vermelho");
      }
    }

    validaEmailRep(emailRep, id) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        let elemento = document.getElementById(`${id}`);
    
        if (regex.test(emailRep)) {
          if (elemento.classList.contains('vermelho')) {
            elemento.classList.remove('vermelho');
          }
          return;
        } else {
          elemento.classList.add('vermelho');
        }
      }

      validaRG(rg, id) {
        let regex = /^[0-9]{8}$/;
    
        let elemento = document.getElementById(`${id}`);
    
        if (regex.test(rg)) {
          if (elemento.classList.contains('vermelho')) {
            elemento.classList.remove('vermelho');
          }
          return;
        } else {
          elemento.classList.add('vermelho');
        }
      }
      validaNumero(numero, id) {
        let regex = /^[0-9]+$/;
    
        let elemento = document.getElementById(`${id}`);
    
        if (regex.test(numero)) {
          if (elemento.classList.contains('vermelho')) {
            elemento.classList.remove('vermelho');
          }
          return;
        } else {
          elemento.classList.add('vermelho');
        }
      }  
      validaCEP(cep, id) {
      
        let regex = /^\d{5}-\d{3}$/;
    
        let elemento = document.getElementById(`${id}`);
    
        if (regex.test(cep)) {
          if (elemento.classList.contains('vermelho')) {
            elemento.classList.remove('vermelho');
          }
          return;
        } else {
          elemento.classList.add('vermelho');
        }
      }
      validaBairro(bairro, id) {
        const campoBairro = document.getElementById(id);
    
        if (!bairro || bairro.trim() === "") {
          campoBairro.classList.add("vermelho");
          alert("Bairro é um campo obrigatório.");
          return false;
        } else {
          campoBairro.classList.remove("vermelho");
          return true;
        }
      }

      validaCidade(cidade, id) {
        const campoCidade = document.getElementById(id);
    
        if (!cidade || cidade.trim() === "") {
          campoCidade.classList.add("vermelho");
          alert("Cidade é um campo obrigatório.");
          return false;
        } else {
          campoCidade.classList.remove("vermelho");
          return true;
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