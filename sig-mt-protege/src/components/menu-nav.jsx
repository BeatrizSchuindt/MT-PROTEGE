import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../images/logo-definitiva-mt-protege.png"; // Substitua pelo caminho real da sua logo
import IconePainelPrincipal from "../images/icone-painel-principal.png"; // Substitua pelo caminho real do seu ícone
import IconePolicia from "../images/icone-policia.png"; // Substitua pelo caminho real do seu ícone
import IconePerfil from "../images/icone-perfil.png"; // Substitua pelo caminho real do seu ícone
import IconeOcorrencia from "../images/icone-ocorrencia.png"; // Substitua pelo caminho real do seu ícone
import IconeAjuda from "../images/icone-ajuda.png"; // Substitua pelo caminho real do seu ícone
import IconeLogout from "../images/icone-logout.png"; // Substitua pelo caminho real do seu ícone

import "../pages/styles/styles.css"; // Substitua pelo nome real do seu arquivo de estilos

const Menu = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define 768 como limite para telas móveis, você pode ajustar conforme necessário
    };

    // Registra um listener de redimensionamento para verificar se a tela é móvel ou não
    window.addEventListener("resize", handleResize);

    // Verifica o tamanho da tela quando o componente é montado
    handleResize();

    // Remove o listener de redimensionamento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getMenuItems = () => {
    // Define os itens do menu com ícones e textos
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
            className={`icones-menu-nav ${isMobile ? "icon-mobile" : ""}`} // Adicione a classe 'icon-mobile' para ajustar o tamanho do ícone em telas menores
          />
          {!isMobile && item.text} {/* Exibe o texto apenas em telas maiores */}
        </Link>
      </li>
    ));
  };

  return (
    <nav
      className="custom-bg-color"
      style={{ width: "18%", height: "100vh", position: "relative" }}
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
                sessionStorage.removeItem("token");
                navigate("/");
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
  );
};

export default Menu;
