import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Row, Col, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import IconeSemConexao from '../images/icone-erro-500.png';

import Menu from "../components/menu-nav";

import ChartView from "./graficos/ColumnChart";
import ChartPieView from "./graficos/PieChart";

import { getPolicialID } from "../services/policial-services";
import { contarPoliciais } from "../services/policial-services";
import { contarOcorrencias } from "../services/ocorrencia-services";
import { contarOcorrenciasResolvidas } from "../services/ocorrencia-services";

function PainelPrincipal() {

  const [error, setError] = useState(null);
  const [showModalCaiu, setShowModalCaiu] = useState(false);
  const [policial, setPolicial] = useState({});
  const [countPoliciais, setCountPoliciais] = useState([]);
  const [countOcorrencias, setCountOcorrencias] = useState([]);
  const [countOcorrenciasResolvidas, setCountOcorrenciasResolvidas] = useState([]);

  useEffect(() => {
    const fetchCountPoliciais = async () => {
      try {
        const responseData = await contarPoliciais();
        setCountPoliciais(responseData.data);
      } catch (error) {
        console.error("Erro ao buscar contagem de policiais no componente:", error);
        setError(error.message);
        if (error.response.status === 500) {
          setShowModalCaiu(true);
        }
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

    const getPolicial = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const policial = jwt_decode(token);
        const result = await getPolicialID(policial.id);
        setPolicial(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountPoliciais();
    fetchCountOcorrencias();
    fetchCountOcorrenciasResolvidas();
    getPolicial();
  }, []);

  const handleCloseModalCaiu = () => setShowModalCaiu(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

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

          <h3 style={{marginLeft: '40px', marginBottom: '20px'}}>
                {`Olá, ${policial.nome_completo
                  ?.split(" ")
                  .shift()}. Aqui estão as principais informações do sistema:`}
          </h3>

          {error && <p className="text-danger" style={{ textAlign: 'center', fontSize: '25px', marginBottom: '25px' }}>ERRO INTERNO: {error}</p>}

          <Row className="mb-5" style={{ marginLeft: "30px" }}>
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
                <h4 style={{ margin: '0' }}>POLICIAIS CADASTRADOS</h4>
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
                <h4 style={{ margin: '0' }}>OCORRÊNCIAS CADASTRADAS</h4>
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

          <Row style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
            <Col style={{ width: "50%" }}><ChartPieView /></Col>
            <Col style={{ width: "50%" }}><ChartView /></Col>
          </Row>
        </main>
      </div>
      <Modal show={showModalCaiu} onHide={handleCloseModalCaiu}>
        <Modal.Header>
          <Modal.Title>
            <Row className="align-items-center">
              <Col xs="auto">
                <img
                  src={IconeSemConexao}
                  alt="Icone error 500"
                  style={{ width: '64px' }}
                />
              </Col>
              <Col>
                <p className="mb-0">ERRO INTERNO!</p>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}> O servidor está indisponível no momento...</p>
          <p style={{ fontSize: '1.3rem' }}>Estamos trabalhando para solucionar o mais rápido possível!</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModalCaiu}>
            Entendido
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PainelPrincipal;
