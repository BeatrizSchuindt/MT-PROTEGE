import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import Menu from "../components/menu-nav";

function Ajuda() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

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

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

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
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>PAINEL PRINCIPAL</h3>
                  <p>
                    Para analisar os dados do sistema de uma forma mais
                    intuitiva
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
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>MENU DE NAVEGAÇÃO RÁPIDA</h3>
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
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>TELA DE POLICIAIS CADASTRADOS</h3>
                  <p>
                    Analise, com filtros, os policiais cadastrados no sistema
                  </p>
                  <Button variant="primary" onClick={openModal3}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>

              <Col className="d-flex align-items-center justify-content-center">
                <div
                  className="question-box"
                  style={{
                    backgroundColor: "#FFEA7F",
                    width: "80%",
                    borderRadius: "15px",
                    padding: "15px",
                  }}
                >
                  <h3>TELA DE OCORRÊNCIAS</h3>
                  <p>
                    Saiba agora como registrar, analisar, atualizar e excluir
                    ocorrências
                  </p>
                  <Button variant="primary" onClick={openModal4}>
                    Abrir Detalhes
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </main>

        <Modal show={showModal1} onHide={closeModal1}>
          <Modal.Header closeButton>
            <Modal.Title>PAINEL PRINCIPAL</Modal.Title>
          </Modal.Header>
          <Modal.Body>Dúvidas do painel principal aqui</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal1}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal2} onHide={closeModal2}>
          <Modal.Header closeButton>
            <Modal.Title>FUNCIONALIDADES DO MENU DE NAVEGAÇÃO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              PAINEL PRINCIPAL:
            </p>
            <p>
              Clique no primeiro item do menu de navegação, que geralmente é
              representado por um ícone ou texto como "Dashboard" ou "Painel".
              Esta seção é o coração do sistema, exibindo dados analíticos
              importantes, gráficos e informações essenciais para a tomada de
              decisões
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>POLICIAL:</p>
            <p>
              Para consultar informações sobre policiais cadastrados na
              plataforma, clique no segundo item do menu, que pode ser rotulado
              como "Policial" ou "Cadastro de Policiais". Aqui, você encontrará
              detalhes sobre os policiais e suas atribuições.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              EDITAR PERFIL:
            </p>
            <p>
              Caso você seja um policial e deseje editar seu perfil ou desativar
              sua conta, basta clicar no terceiro item do menu, provavelmente
              indicado como "Editar Perfil" ou algo similar. Nesta seção, você
              poderá fazer ajustes em suas informações pessoais e de conta.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>
              OCORRÊNCIAS:
            </p>
            <p>
              Para registrar, atualizar, consultar ou deletar ocorrências,
              navegue até o quarto item do menu, muitas vezes denominado
              "Ocorrências" ou "Registros de Ocorrências". Aqui, você terá
              acesso a todas as funcionalidades relacionadas a incidentes e
              eventos registrados no sistema.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>AJUDA:</p>
            <p>
              Se precisar de orientações sobre as principais funcionalidades do
              sistema, vá até o quinto item do menu, que costuma ser
              identificado como "Ajuda" ou "Suporte". Aqui, você encontrará
              informações detalhadas e guias que explicam como usar o sistema de
              forma eficaz.
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0" }}>LOGOUT:</p>
            <p>
              Por fim, para sair do sistema de forma segura, localize o botão de
              logout. Isso normalmente está localizado na parte superior direita
              ou no final do menu. Clique nele para encerrar sua sessão e
              garantir a privacidade de sua conta.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal2}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal3} onHide={closeModal3}>
          <Modal.Header closeButton>
            <Modal.Title>TELA DE POLICIAIS CADASTRADOS</Modal.Title>
          </Modal.Header>
          <Modal.Body>Dúvidas da tela de policiais cadastrados vai estar aqui.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal3}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal4} onHide={closeModal4}>
          <Modal.Header closeButton>
            <Modal.Title>TELA DE OCORRÊNCIA</Modal.Title>
          </Modal.Header>
          <Modal.Body>Dúvidas da tela de ocorrências vai estar aqui.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeModal4}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Ajuda;
