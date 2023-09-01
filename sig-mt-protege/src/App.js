import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './paginas/login';
import Cadastro from './paginas/cadastro';
import PainelPrincipal from './paginas/painel-principal';
import Policiais from './paginas/crud-policiais';
import Ocorrencias from './paginas/crud-ocorrencias';
import Ajuda from './paginas/ajuda';

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
