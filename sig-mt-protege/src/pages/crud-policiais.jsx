import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Logo from "../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../images/icone-logout.png";
import IconePainelPrincipal from "../images/icone-painel-principal.png";
import IconePolicia from "../images/icone-policia.png";
import IconeOcorrencia from "../images/icone-ocorrencia.png";
import IconeAjuda from "../images/icone-ajuda.png";

import { getPoliciais as fetchPoliciais } from "../services/policial-services"; // Renomeado para evitar conflito

function Policiais() {
  const navigate = useNavigate();
  
  const [policiais, setPoliciais] = useState([]);
  const [error, setError] = useState(null);

  const fetchLocalPoliciais = async () => {
    try {
      const result = await fetchPoliciais(); // Usando o nome renomeado
      console.log("Dados retornados:", result.data);  
      setPoliciais(result.data);
    } catch (error) {
      console.log(error);
      setError(error.toString()); // Armazenando o erro no estado
    }
  }

  useEffect(() => {
    fetchLocalPoliciais();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <nav
          className="custom-bg-color"
          style={{ width: "18%", height: "100vh", position: "relative" }}
        >
          <div className="logo-container">
            <img src={Logo} alt="Minha Logo" className="logo" />
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/painel-principal">
                <img
                  src={IconePainelPrincipal}
                  alt="Icone Painel Principal"
                  className="icones-menu-nav"
                />
                PAINEL PRINCIPAL
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/policiais">
                <img
                  src={IconePolicia}
                  alt="Icone Policial"
                  className="icones-menu-nav"
                />
                POLICIAIS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/ocorrencias">
                <img
                  src={IconeOcorrencia}
                  alt="Icone Ocorrencia"
                  className="icones-menu-nav"
                />
                OCORRÊNCIAS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/ajuda">
                <img
                  src={IconeAjuda}
                  alt="Icone Ajuda"
                  className="icones-menu-nav"
                />
                AJUDA / SUPORTE
              </a>
            </li>
          </ul>

          {/* SAIR DO SISTEMA com ícone */}
          <div style={{ position: "absolute", bottom: "0", width: "90%" }}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  <img
                    src={IconeLogout}
                    alt="Icone Logout"
                    className="icone-logout"
                  />
                  SAIR DO SISTEMA
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col">
          <h1>POLICIAIS</h1>
          <div className='policiais-page-area'>
                    <div className='policial-area'>
                        {policiais && policiais.length > 0 ?
                            <table className="table table-striped">
                                <thead className="thead-light">
                                    <tr>
                                        <th className='text-center' scope="col">MATRÍCULA</th>
                                        <th className='text-center' scope="col">NOME</th>
                                        <th className='text-center' scope="col">CARGO</th>
                                        <th className='text-center' scope="col">JURISDIÇÃO</th>
                                        <th className='text-center' scope="col">UNIDADE POLICIAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {policiais.map((policial, index) => (
                                        <tr key={policial.id} scope='row'>
                                            <td className="text-center"> {policial.matricula_policial} </td>
                                            <td className="text-center"> {policial.nome_completo}</td>
                                            <td className="text-center"> {policial.cargo_graduacao}</td>
                                            <td className="text-center"> {policial.jurisdicao}</td>
                                            <td className="text-center"> {policial.unidade_policia}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> : <p className='text-center'>Não existe nenhum policial cadastrado</p>}
                    </div>
                </div>
        </main>
      </div>
    </div>
  );
}

export default Policiais;
