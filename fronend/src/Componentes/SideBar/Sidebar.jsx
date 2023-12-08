import "./sidebar.css";
import Brasao from "../Brasao/Brasao.jsx";

function Sidebar() {
  return (
    <>
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <Brasao></Brasao>
        </a>
        <hr></hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/" class="nav-link active" aria-current="page">
              {" "}
              <i class="bi bi-house-door-fill"></i> HOME
            </a>
          </li>
          <li>
            <a href="/funcionario" class="nav-link text-white">
              {" "}
              <i class="bi bi-file-earmark-richtext"></i> FUNCIONÁRIO
            </a>
          </li>
          <li>
            <a href="/aluno" class="nav-link text-white">
              {" "}
              <i class="bi bi-file-earmark-richtext"></i> ALUNO
            </a>
          </li>
          <li>
            <a href="/disciplina" class="nav-link text-white">
              {" "}
              <i class="bi bi-file-earmark-richtext"></i> DISCIPLINA
            </a>
          </li>
          <li>
            <a href="/turma" class="nav-link text-white">
              {" "}
              <i class="bi bi-file-earmark-richtext"></i> TURMA
            </a>
          </li>
        </ul>
        <hr></hr>
      </div>
    </>
  );
}

export default Sidebar;
