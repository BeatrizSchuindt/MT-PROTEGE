import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/logo-definitiva-mt-protege.png';
import IconeLogout from '../images/icone-logout.png';
import IconePainelPrincipal from '../images/icone-painel-principal.png';
import IconePolicia from '../images/icone-policia.png';
import IconeOcorrencia from '../images/icone-ocorrencia.png';
import IconeAjuda from '../images/icone-ajuda.png';
import './styles/styles.css';

function Ajuda() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <nav className="custom-bg-color" style={{ width: '18%', height: '100vh', position: 'relative' }}>
          <div className="logo-container">
            <img src={Logo} alt="Minha Logo" className="logo" />
          </div>
          <ul className="nav flex-column" style={{width: '0%'}}>
            <li className="nav-item" style={{}}>
              <a className="nav-link text-light" href="/painel-principal">
                <img src={IconePainelPrincipal} alt="Icone Painel Principal" className="icones-menu-nav" />PAINEL PRINCIPAL
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/policiais">
                <img src={IconePolicia} alt="Icone Policial" className="icones-menu-nav" />POLICIAIS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/ocorrencias">
                <img src={IconeOcorrencia} alt="Icone Ocorrencia" className="icones-menu-nav" />OCORRÊNCIAS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/ajuda">
                <img src={IconeAjuda} alt="Icone Ajuda" className="icones-menu-nav" />AJUDA / SUPORTE
              </a>
            </li>
          </ul>

          {/* SAIR DO SISTEMA com ícone */}
          <div style={{ position: 'absolute', bottom: '0', width: '90%' }}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link text-light" href="/">
                  <img src={IconeLogout} alt="Icone Logout" className="icone-logout" />SAIR DO SISTEMA
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col">
          <h1>AJUDA</h1>
        </main>
      </div>
    </div>
  );
}

export default Ajuda;
