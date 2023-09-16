import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Logo from "../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../images/icone-logout.png";
import IconePainelPrincipal from "../images/icone-painel-principal.png";
import IconePolicia from "../images/icone-policia.png";
import IconeOcorrencia from "../images/icone-ocorrencia.png";
import IconeAjuda from "../images/icone-ajuda.png";

import { filtroPoliciais as fetchPoliciais } from "../services/policial-services";

function Policiais() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const [policiais, setPoliciais] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const result = await fetchPoliciais(data); // Passar os dados do formulário
      setPoliciais(result.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  };

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
          <h1
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "350%",
            }}
          >
            POLICIAIS CADASTRADOS
          </h1>

          <form
            className="mb-3"
            noValidate
            validated={!errors}
            onSubmit={handleSubmit(onSubmit)} 
          >
            <div style={{ width: "80%", margin: "auto" }}>
              <Row>
                <Col>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      label="Matricula"
                      type="text"
                      name="matricula_policial"
                      placeholder="Buscar pelo número de matrícula do policial"
                      isValid={!errors.matricula_policial}
                      isInvalid={errors.matricula_policial}
                      required
                      {...register("matricula_policial", {
                        pattern: {
                          value: /^[0-9]{8}$/,
                          message: "Matrícula inválida!",
                        },
                        minLength: {
                          value: 8,
                          message: "A matrícula precisa ter 8 caracteres.",
                        },
                      })}
                    />
                    {errors.matricula_policial && (
                      <p className="hook-form-error">
                        {errors.matricula_policial.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <input
                    className="form-control"
                    label="NomeCompleto"
                    type="text"
                    name="nome_completo"
                    placeholder="Buscar pelo nome do policial"
                    isValid={!errors.nome_completo}
                    isInvalid={errors.nome_completo}
                    required
                    {...register("nome_completo")}
                  />
                  {errors.nome_completo && (
                    <p className="hook-form-error">
                      {errors.nome_completo.message}
                    </p>
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  <select
                    className={`form-select ${
                      errors.jurisdicao ? "is-invalid" : ""
                    }`}
                    name="jurisdicao"
                    id="jurisdicao"
                    placeholder="Selecione a jurisdição"
                    required
                    {...register("jurisdicao")}
                  >
                    <option value="">Selecione uma opção de jurisdição</option>
                    <option value="Civil">Civil</option>
                    <option value="Militar">Militar</option>
                  </select>
                  {errors.jurisdicao && (
                    <p className="hook-form-error">
                      {errors.jurisdicao.message}
                    </p>
                  )}
                </Col>

                <Col>
                  <input
                    className="form-control"
                    label="CargoGraduacao"
                    type="text"
                    name="cargo_graduacao"
                    placeholder="Busque pelo cargo/graduação"
                    isValid={!errors.cargo_graduacao}
                    isInvalid={errors.cargo_graduacao}
                    required
                    {...register("cargo_graduacao", {
                      pattern: {
                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                        message: "Use apenas letras e espaços.",
                      },
                    })}
                  />
                  {errors.cargo_graduacao && (
                    <p className="hook-form-error">
                      {errors.cargo_graduacao.message}
                    </p>
                  )}
                </Col>

                <Col>
                  <input
                    className="form-control"
                    label="UnidadePolicial"
                    type="text"
                    name="unidade_policia"
                    placeholder="Busque pela unidade policial"
                    isValid={!errors.unidade_policia}
                    isInvalid={errors.unidade_policia}
                    required
                    {...register("unidade_policia", {
                      pattern: {
                        value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                        message: "Use apenas letras e espaços.",
                      },
                    })}
                  />
                  {errors.unidade_policia && (
                    <p className="hook-form-error">
                      {errors.unidade_policia.message}
                    </p>
                  )}
                </Col>
              </Row>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex justify-content-center p-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
                style={{ backgroundColor: "#00296B" }}
              >
                BUSCAR
              </button>
            </div>
          </form>

          <div className="policiais-page-area">
            <div className="policial-area">
              {policiais && policiais.length > 0 ? (
                <table className="table table-striped">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center" scope="col">
                        MATRÍCULA
                      </th>
                      <th className="text-center" scope="col">
                        NOME
                      </th>
                      <th className="text-center" scope="col">
                        CARGO
                      </th>
                      <th className="text-center" scope="col">
                        JURISDIÇÃO
                      </th>
                      <th className="text-center" scope="col">
                        UNIDADE POLICIAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {policiais.map((policial, index) => (
                      <tr key={policial.id} scope="row">
                        <td className="text-center">
                          {" "}
                          {policial.matricula_policial}{" "}
                        </td>
                        <td className="text-center">
                          {" "}
                          {policial.nome_completo}
                        </td>
                        <td className="text-center">
                          {" "}
                          {policial.cargo_graduacao}
                        </td>
                        <td className="text-center"> {policial.jurisdicao}</td>
                        <td className="text-center">
                          {" "}
                          {policial.unidade_policia}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">
                  NENHUM POLICIAL ENCONTRADO
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Policiais;
