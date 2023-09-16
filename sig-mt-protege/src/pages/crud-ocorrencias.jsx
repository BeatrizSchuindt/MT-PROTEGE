import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Logo from "../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../images/icone-logout.png";
import IconePainelPrincipal from "../images/icone-painel-principal.png";
import IconePolicia from "../images/icone-policia.png";
import IconeOcorrencia from "../images/icone-ocorrencia.png";
import IconeAjuda from "../images/icone-ajuda.png";
import IconeEditar from "../images/icone-editar.png";
import IconeExcluir from "../images/icone-excluir.png";
import IconeRegistrar from "../images/icone-registrar-ocorrencia.png";

import { createOcorrencia } from "../services/ocorrencia-services";
import { filtroOcorrencias } from "../services/ocorrencia-services";
import { updateOcorrencia } from "../services/ocorrencia-services";
import { deleteOcorrencia } from "../services/ocorrencia-services";

function Ocorrencias() {
  //Estados dos Modal de Create e Update de Ocorrência
  const [modalShow, setModalShow] = useState({
    novaOcorrencia: false,
    atualizarOcorrencia: false,
  });

  //Declarando funções do hook-form - para o FILTRO DE OCORRÊNCIAS
  const {
    handleSubmit: handleSubmit1,
    register: register1,
    formState: { errors: errors1 },
    isValid: isValid1,
  } = useForm({ mode: "onChange" });

  //Declarando funções do hook-form - para o CREATE DE OCORRÊNCIAS
  const {
    handleSubmit: handleSubmit2,
    register: register2,
    formState: { errors: errors2 },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  //declarando estados dos componentes
  const [ocorrencias, setOcorrencias] = useState([]);
  const [error, setError] = useState(null);
  const handleClose = (modalName) => {
    setModalShow({ ...modalShow, [modalName]: false });
  };

  const handleShow = (modalName) => {
    setModalShow({ ...modalShow, [modalName]: true });
  };

  //submit de read de ocorrências - COM OU SEM FILTRO
  const onSubmitRead = async (data) => {
    try {
      const result = await filtroOcorrencias(data); // Passar os dados do formulário
      setOcorrencias(result.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  };

  //submit de create de ocorrências
  const onSubmitCreate = async (data) => {
    try {
      const ocorrencia = await createOcorrencia(data);
      handleClose("novaOcorrencia");
    } catch (error) {
      setError({ message: error.response.data.error });
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
          <div>
            <Row>
              <Col>
                <h1
                  style={{
                    marginTop: "50px", // Espaço a partir do topo
                    marginLeft: "40px", // Espaço a partir da esquerda
                    marginBottom: "50px",
                    fontSize: "350%",
                  }}
                >
                  OCORRÊNCIAS
                </h1>
              </Col>

              <Col>
                <Button
                  style={{
                    backgroundColor: "#3CE500",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "150%",
                    border: "none",
                    borderRadius: "20px",
                    marginTop: "75px",
                    textAlign: "center", // Centraliza o texto
                    display: "flex", // Torna o botão um contêiner flexível
                    alignItems: "center", // Centraliza itens flexíveis verticalmente
                    justifyContent: "center", // Centraliza itens flexíveis horizontalmente
                    padding: "5px", // Adiciona padding interno
                  }}
                  onClick={() => handleShow("novaOcorrencia")}
                >
                  REGISTRAR NOVA OCORRÊNCIA
                  <img
                    src={IconeRegistrar}
                    style={{
                      marginLeft: "15px",
                      width: "2rem",
                      height: "2rem",
                    }}
                  ></img>
                </Button>
              </Col>
            </Row>
          </div>

          {/*FILTRO DE OCORRÊNCIAS*/}
          <form
            className="mb-3"
            noValidate
            validated={!errors1}
            onSubmit={handleSubmit1(onSubmitRead)}
          >
            <div style={{ width: "90%", marginLeft: "40px" }}>
              <label
                htmlFor="data_nascimento"
                className="form-label form-large-font"
                style={{ fontWeight: "Bold" }}
              >
                Filtros disponíveis:
              </label>
              <Row>
                <Col>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      label="id"
                      type="text"
                      name="id"
                      placeholder="Buscar pelo ID da ocorrência"
                      isValid={!errors1.id}
                      isInvalid={errors1.id}
                      required
                      {...register1("id", {
                        pattern: {
                          value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                          message: "Use apenas letras e espaços.",
                        },
                      })}
                    />
                    {errors1.id && (
                      <p className="hook-form-error">{errors1.id.message}</p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      label="Matricula"
                      type="text"
                      name="matricula_policial"
                      placeholder="Buscar pelo número de matrícula do policial"
                      isValid={!errors1.matricula_policial}
                      isInvalid={errors1.matricula_policial}
                      required
                      {...register1("matricula_policial", {
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
                    {errors1.matricula_policial && (
                      <p className="hook-form-error">
                        {errors1.matricula_policial.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <select
                    className={`form-select ${
                      errors1.status_ocorrencia ? "is-invalid" : ""
                    }`}
                    name="status_ocorrencia"
                    id="status_ocorrencia"
                    placeholder="Busque pelo status da ocorrência"
                    required
                    {...register1("status_ocorrencia")}
                  >
                    <option value="">Selecione uma opção de status</option>
                    <option value="Reportada">Reportada</option>
                    <option value="Em Investigação">Em Investigação</option>
                    <option value="Caso Encerrado sem Resolução">
                      Caso Encerrado sem Resolução
                    </option>
                    <option value="Em Julgamento">Em Julgamento</option>
                    <option value="Arquivado">Arquivado</option>
                    <option value="Reaberto">Reaberto</option>
                    <option value="Prescrito">Prescrito</option>
                    <option value="Resolvido">Resolvido</option>
                  </select>
                  {errors1.status_ocorrencia && (
                    <p className="hook-form-error">
                      {errors1.status_ocorrencia.message}
                    </p>
                  )}
                </Col>

                <Col>
                  <select
                    className={`form-select ${
                      errors1.tipo_ocorrencia ? "is-invalid" : ""
                    }`}
                    name="tipo_ocorrencia"
                    id="tipo_ocorrencia"
                    placeholder="Selecione o tipo de ocorrência"
                    required
                    {...register1("tipo_ocorrencia")}
                  >
                    <option value="">Selecione o tipo de ocorrência</option>
                    <option value="Homicídio">Homicídio</option>
                    <option value="Agressão">Agressão</option>
                    <option value="Roubo">Roubo</option>
                    <option value="Estupro e Abuso Sexual">
                      Estupro e Abuso Sexual
                    </option>
                    <option value="Furto">Furto</option>
                    <option value="Vandalismo">Vandalismo</option>
                    <option value="Fraude">Fraude</option>
                    <option value="Evasão Fiscal">Evasão Fiscal</option>
                    <option value="Contrabando">Contrabando</option>
                    <option value="Cibercrime">Cibercrime</option>
                    <option value="Corrupção">Corrupção</option>
                    <option value="Outros">Outros...</option>
                  </select>
                  {errors1.tipo_ocorrencia && (
                    <p className="hook-form-error">
                      {errors1.tipo_ocorrencia.message}
                    </p>
                  )}
                </Col>

                <Col>
                  <input
                    className="form-control"
                    label="data_ocorrencia"
                    type="date"
                    name="data_ocorrencia"
                    placeholder="Busque pela data da ocorrência"
                    isValid={!errors1.data_ocorrencia}
                    isInvalid={errors1.data_ocorrencia}
                    required
                    {...register1("data_ocorrencia")}
                  />
                  {errors1.data_ocorrencia && (
                    <p className="hook-form-error">
                      {errors1.data_ocorrencia.message}
                    </p>
                  )}
                </Col>
              </Row>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div
              style={{ width: "90%", marginLeft: "40px", paddingTop: "15px" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid1}
                style={{ backgroundColor: "#00296B" }}
              >
                BUSCAR
              </button>
            </div>
          </form>

          {/*TABELA DE OCORRÊNCIAS*/}
          <div className="ocorrencias-page-area">
            <div className="ocorrencia-area">
              {ocorrencias && ocorrencias.length > 0 ? (
                <table className="table table-striped">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center" scope="col">
                        ID
                      </th>
                      <th className="text-center" scope="col">
                        MATRÍCULA POLICIAL
                      </th>
                      <th className="text-center" scope="col">
                        STATUS
                      </th>
                      <th className="text-center" scope="col">
                        TIPO
                      </th>
                      <th className="text-center" scope="col">
                        DATA AQUISIÇÃO
                      </th>
                      <th className="text-center" scope="col">
                        {" "}
                        {""}
                      </th>
                      <th className="text-center" scope="col">
                        {" "}
                      </th>
                      <th className="text-center" scope="col">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ocorrencias.map((ocorrencia, index) => (
                      <tr key={ocorrencia.id} scope="row">
                        <td className="text-center"> {ocorrencia.id} </td>
                        <td className="text-center">
                          {" "}
                          {ocorrencia.matricula_policial}
                        </td>
                        <td className="text-center">
                          {" "}
                          {ocorrencia.status_ocorrencia}
                        </td>
                        <td className="text-center">
                          {" "}
                          {ocorrencia.tipo_ocorrencia}
                        </td>
                        <td className="text-center">
                          {" "}
                          {ocorrencia.data_ocorrencia}
                        </td>
                        <td className="text-center">
                          <button
                            style={{
                              backgroundColor: "#FFD500",
                              fontWeight: "Bold",
                              border: "none",
                              borderRadius: "5px",
                            }}
                          >
                            CLIQUE
                          </button>
                        </td>
                        <td className="text-center">
                          <img
                            className="ocorrencia-row-icon"
                            src={IconeEditar}
                            alt="Ícone Editar ocorrencia"
                          />
                        </td>
                        <td className="text-center">
                          <img
                            className="ocorrencia-row-icon"
                            src={IconeExcluir}
                            alt="Ícone Deletar ocorrencia"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">NENHUMA OCORRÊNCIA ENCONTRADA</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Ocorrencias;
