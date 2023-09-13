import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import PainelPrincipal from './pages/painel-principal';
import Policiais from './pages/crud-policiais';
import Ocorrencias from './pages/crud-ocorrencias';
import Ajuda from './pages/ajuda';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/painel-principal" element={<PainelPrincipal />}/>
        <Route path="/policiais" element={<Policiais />}/>
        <Route path="/ocorrencias" element={<Ocorrencias />}/>
        <Route path="/ajuda" element={<Ajuda />}/>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
