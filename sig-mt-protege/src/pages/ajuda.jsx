import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import Menu from "../components/menu-nav";

function Ajuda() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);

  const openModal1 = () => {
    setShowModal1(true);
  };

  const closeModal1 = () => {
    setShowModal1(false);
  };

  const openModal2 = () => {
    setShowModal2(true);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const openModal3 = () => {
    setShowModal3(true);
  };

  const closeModal3 = () => {
    setShowModal3(false);
  };

  const openModal4 = () => {
    setShowModal4(true);
  };

  const closeModal4 = () => {
    setShowModal4(false);
  };

  const openModal5 = () => {
    setShowModal5(true);
  };

  const closeModal5 = () => {
    setShowModal5(false);
  };

  const openModal6 = () => {
    setShowModal6(true);
  };

  const closeModal6 = () => {
    setShowModal6(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu/>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
          <h1
            style={{
              marginTop: "30px", // Espaço a partir do topo
              marginLeft: "30px", // Espaço a partir da esquerda
              marginBottom: "50px",
              fontSize: "320%",
            }}
          >
            AJUDA / SUPORTE DO SISTEMA
          </h1>
          <div style={{ height: "100%" }}>
            <Row className="align-items-center mb-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "beige",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    LOGIN
                  </h3>
                  <p>
                    Caso queira acessar o sistema, é necessário possuir
                    credenciais cadastradas
                  </p>
                  <Button variant="primary" onClick={openModal1}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "beige",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    MENU DE NAVEGAÇÃO RÁPIDA
                  </h3>
                  <p>
                    O menu que está no lado esquerdo da tela, orienta de forma
                    simples a navegação
                  </p>
                  <Button variant="primary" onClick={openModal2}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="align-items-center mb-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "beige",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    CADASTRO
                  </h3>
                  <p>Para criar uma conta no sistema, forneça seus dados</p>
                  <Button variant="primary" onClick={openModal3}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "beige",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    TELA DE POLICIAIS CADASTRADOS
                  </h3>
                  <p>
                    Analise, com filtros, os policiais cadastrados no sistema
                  </p>
                  <Button variant="primary" onClick={openModal4}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="align-items-center mb-5">
              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "beige",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    PAINEL PRINCIPAL
                  </h3>
                  <p>
                    Para analisar os dados do sistema de uma forma mais
                    intuitiva
                  </p>
                  <Button variant="primary" onClick={openModal5}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    border: "groove",
                    borderColor: "black",
                    width: "80%",
                    borderRadius: "15px",
                  }}
                >
                  <h3 style={{ marginTop: "10px", marginLeft: "15px" }}>
                    TELA DE OCORRÊNCIAS
                  </h3>
                  <p>
                    Saiba agora como registrar, analisar, atualizar e excluir
                    ocorrências
                  </p>
                  <Button variant="primary" onClick={openModal6}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </main>
        <Row>
          <Col>
            <Modal show={showModal1} onHide={closeModal1}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 1</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 1 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal1}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col>
            <Modal show={showModal2} onHide={closeModal2}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 2</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 2 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal2}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col>
            <Modal show={showModal3} onHide={closeModal3}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 3</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 3 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal3}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col>
            <Modal show={showModal4} onHide={closeModal4}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 4</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 4 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal4}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col>
            <Modal show={showModal5} onHide={closeModal5}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 5</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 5 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal5}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col>
            <Modal show={showModal6} onHide={closeModal6}>
              <Modal.Header closeButton>
                <Modal.Title>Detalhes da Dúvida 6</Modal.Title>
              </Modal.Header>
              <Modal.Body>Detalhes da dúvida 6 vão aqui.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={closeModal6}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Ajuda;
