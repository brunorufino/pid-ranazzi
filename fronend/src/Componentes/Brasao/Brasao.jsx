import img from './img/download-removebg-preview.png';
import './Brasao.css';

function Brasao() {
    return ( 
            <>
        <div className="row">
           <img  src={img} alt="Descrição da imagem" />
           <div className="row">
             <span class="fs-4">Oswaldo Ranazzi</span>
            </div>   
      </div>
            </>
     );
}

export default Brasao;