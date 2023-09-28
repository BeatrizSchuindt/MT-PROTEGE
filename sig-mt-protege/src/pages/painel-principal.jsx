import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Menu from "../components/menu-nav";

import ChartView from "./graficos/ColumnChart";
import ChartPieView from "./graficos/PieChart";

import { contarPoliciais } from "../services/policial-services";
import { contarOcorrencias } from "../services/ocorrencia-services";
import { contarOcorrenciasResolvidas } from "../services/ocorrencia-services";

function PainelPrincipal() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
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
        setError(error.message);
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
        setError(error.message);
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
        setError(error.message);
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
        <Menu/>

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

          {error && <p className="text-danger" style={{textAlign:'center', fontSize:'25px', marginBottom: '25px'}}>ERRO INTERNO: {error}</p>}

          <Row className= "mb-5" style={{ marginLeft: "30px" }}>
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
                  borderRadius: "40px"
                }}
              >
                <h4 style={{margin: '0'}}>POLICIAIS CADASTRADOS</h4>
                <p style={{ fontSize: "5vh", margin: '0' }}>{countPoliciais}</p>
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
                  borderRadius: "40px"
                }}
              >
                <h4 style={{margin: '0'}}>OCORRÊNCIAS CADASTRADAS</h4>
                <p style={{ fontSize: "5vh", margin: '0' }}>{countOcorrencias}</p>
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
                  borderRadius: "40px"
                }}
              >
                <h4 style={{ marginLeft: "10px", margin: '0' }}>OCORRÊNCIAS RESOLVIDAS</h4>
                <p style={{ fontSize: "5vh", margin: '0' }}>{countOcorrenciasResolvidas}</p>
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
