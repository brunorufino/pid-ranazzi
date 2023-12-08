import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Componentes/SideBar/Sidebar.jsx";
import Headers from "./Componentes/Headers/Headers.jsx";
import CadastroFuncionario from "./pages/CadastroFuncionario/CadastroFuncionario.jsx";
import Home from "./pages/Home/Home.jsx";
import CadastroTurma from "./pages/CadastroTurma/CadastroTurma.jsx";
import CadastroDisciplina from "./pages/CadastroDisciplina/CadastroDisciplina.jsx";
import CadastroAluno from "./pages/CadastroAluno/CadastrarAluno.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funcionario" element={<CadastroFuncionario />} />
        <Route path="/aluno" element={<CadastroAluno />} />
        <Route path="/turma" element={<CadastroTurma />} />
        <Route path="/disciplina" element={<CadastroDisciplina />} />
      </Routes>
      <Sidebar />
    </Router>
  );
}

export default App;
