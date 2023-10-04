import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast, Modal, Button, Row, Col } from "react-bootstrap";

import Logo from "../images/logo-definitiva-mt-protege.png"; 
import IconeAvisoLogout from '../images/icone-aviso.png';
import IconePainelPrincipal from "../images/icone-painel-principal.png"; 
import IconePolicia from "../images/icone-policia.png"; 
import IconePerfil from "../images/icone-perfil.png"; 
import IconeOcorrencia from "../images/icone-ocorrencia.png"; 
import IconeAjuda from "../images/icone-ajuda.png"; 
import IconeLogout from "../images/icone-logout.png"; 

import "../pages/styles/styles.css"; 

const Menu = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastSaindoShow, setToastSaindoShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getMenuItems = () => {
    const menuItems = [
      {
        text: "PAINEL PRINCIPAL", icon: IconePainelPrincipal, link: "/painel-principal",
      },
      { text: "POLICIAIS", icon: IconePolicia, link: "/policiais" },
      {
        text: "EDITAR PERFIL",
        icon: IconePerfil,
        link: "/editar-perfilpolicial",
      },
      { text: "OCORRÊNCIAS", icon: IconeOcorrencia, link: "/ocorrencias" },
      { text: "AJUDA / SUPORTE", icon: IconeAjuda, link: "/ajuda" },
    ];

    return menuItems.map((item, index) => (
      <li className="nav-item" key={index}>
        <Link className="nav-link text-light" to={item.link}>
          <img
            src={item.icon}
            alt={`Ícone ${item.text}`}
            className={`icones-menu-nav ${isMobile ? "icon-mobile" : ""}`} 
          />
          {!isMobile && item.text} 
        </Link>
      </li>
    ));
  };

  return (
    <>
      <nav
        className="custom-bg-color"
        style={{ width: "16%", height: "100vh", position: "relative" }}
      >
        <div className="logo-container">
          <img src={Logo} alt="Minha Logo" className="logo" />
        </div>
        <ul className="nav flex-column" style={{ width: "100%" }}>
          {getMenuItems()}
        </ul>

        {/* SAIR DO SISTEMA com ícone */}
        <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className={`nav-link text-light`}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                {isMobile ? (
                  <img
                    src={IconeLogout}
                    alt="Ícone Logout"
                    className={`icon-menu icon-mobile`} // Adicione a classe 'icon-mobile' para ajustar o tamanho do ícone em telas menores
                  />
                ) : (
                  <>
                    <img
                      src={IconeLogout}
                      alt="Ícone Logout"// Não adicione a classe 'icon-mobile' para ajustar o tamanho do ícone em telas maiores
                    />
                    SAIR DO SISTEMA
                  </>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row className="align-items-center">
              <Col xs="auto">
                    <img
                      src={IconeAvisoLogout}
                      alt="Icone Aviso Logout"
                      style={{ width: '64px' }}
                    />
                  </Col>
                  <Col>
                    <p className="mb-0">SAIR DO SISTEMA</p>
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: '1.3rem' }}>Deseja realmente sair do sistema?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Não
          </Button>
          <Button variant="danger" onClick={() => {
            sessionStorage.removeItem("token");
            setShowModal(false)
            setToastSaindoShow(true);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={() => setToastSaindoShow(false)}
        show={toastSaindoShow}
        delay={3000}
        autohide
        style={{
          position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              width: "400px",
              fontSize: "1.5rem",
              padding: "20px",
              backgroundColor: "#FFFFFF", 
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toast.Header style={{ backgroundColor: "red" }}>
          <strong className="mr-auto" style={{ color: 'white', fontSize: '1.5rem' }}>SAINDO DO SISTEMA...</strong>
        </Toast.Header>
        <Toast.Body style={{ textAlign: 'center', fontSize: '1.5rem', justifyContent: 'center' }}>Um até logo!</Toast.Body>
      </Toast>
    </>
  );
};

export default Menu;
