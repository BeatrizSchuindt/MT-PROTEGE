import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Logo from "../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../images/icone-logout.png";
import IconePainelPrincipal from "../images/icone-painel-principal.png";
import IconePolicia from "../images/icone-policia.png";
import IconePerfil from "../images/icone-perfil.png";
import IconeOcorrencia from "../images/icone-ocorrencia.png";
import IconeAjuda from "../images/icone-ajuda.png";

import ChartView from "./graficos/ColumnChart";
import ChartPieView from "./graficos/PieChart";

import { contarPoliciais } from "../services/policial-services";
import { contarOcorrencias } from "../services/ocorrencia-services";
import { contarOcorrenciasResolvidas } from "../services/ocorrencia-services";

function PainelPrincipal() {
  const navigate = useNavigate();

  const [countPoliciais, setCountPoliciais] = useState([]);
  const [countOcorrencias, setCountOcorrencias] = useState([]);
  const [countOcorrenciasResolvidas, setCountOcorrenciasResolvidas] = useState([]);

  useEffect(() => {
    const fetchCountPoliciais = async () => {
      try {
        const responseData = await contarPoliciais();
        setCountPoliciais(responseData.data);
      } catch (error) {
        console.error(
          "Erro ao buscar contagem de policiais no componente:",
          error
        );
      }
    };

    const fetchCountOcorrencias = async () => {
      try {
        const responseData = await contarOcorrencias();
        setCountOcorrencias(responseData.data);
      } catch (error) {
        console.error(
          "Erro ao buscar contagem de ocorrências no componente:",
          error
        );
      }
    };

    const fetchCountOcorrenciasResolvidas = async () => {
      try {
        const responseData = await contarOcorrenciasResolvidas();
        setCountOcorrenciasResolvidas(responseData.data);
      } catch (error) {
        console.error(
          "Erro ao buscar contagem de ocorrências resolvidas no componente:",
          error
        );
      }
    };

    fetchCountPoliciais();
    fetchCountOcorrencias();
    fetchCountOcorrenciasResolvidas();
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
              <a className="nav-link text-light" href="/editar-perfilpolicial">
                <img
                  src={IconePerfil}
                  alt="Icone Perfil"
                  className="icones-menu-nav"
                />
                EDITAR PERFIL
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
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
          <h1
            style={{
              marginTop: "50px",
              marginLeft: "40px",
              marginBottom: "50px",
              fontSize: "350%",
            }}
          >
            PAINEL PRINCIPAL
          </h1>

          <Row style={{ marginLeft: "30px" }}>
            <Col>
              <div
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "23vw",
                  height: "15vh",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4>POLICIAIS CADASTRADOS</h4>
                <p style={{ fontSize: "5vh" }}>{countPoliciais}</p>
              </div>
            </Col>

            <Col>
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "23vw",
                  height: "15vh",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4>OCORRÊNCIAS CADASTRADAS</h4>
                <p style={{ fontSize: "5vh" }}>{countOcorrencias}</p>
              </div>
            </Col>

            <Col>
              <div
                style={{
                  backgroundColor: "#FFD500",
                  color: "white",
                  width: "23vw",
                  height: "15vh",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4 style={{ marginLeft: "10px" }}>OCORRÊNCIAS RESOLVIDAS</h4>
                <p style={{ fontSize: "5vh" }}>{countOcorrenciasResolvidas}</p>
              </div>
            </Col>
          </Row>

          <Row style={{display: "flex", flexDirection: "row", width: "100%", height: "50%"}}>
            <Col style={{width: "50%"}}><ChartPieView/></Col>
            <Col style={{width: "50%"}}><ChartView/></Col>
          </Row>
        </main>
      </div>
    </div>
  );
}

export default PainelPrincipal;
