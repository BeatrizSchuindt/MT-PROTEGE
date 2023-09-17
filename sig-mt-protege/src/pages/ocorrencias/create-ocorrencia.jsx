import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

import Logo from "../../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../../images/icone-logout.png";
import IconePainelPrincipal from "../../images/icone-painel-principal.png";
import IconePolicia from "../../images/icone-policia.png";
import IconeOcorrencia from "../../images/icone-ocorrencia.png";
import IconeAjuda from "../../images/icone-ajuda.png";

import { createOcorrencia } from "../../services/ocorrencia-services";

function RegistrarOcorrencia() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const ocorrencia = await createOcorrencia(data);
      navigate("/ocorrencias");
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
          <div style={{ height: "100vh", overflowY: "auto" }}>
            <h1
              style={{
                marginTop: "50px", // Espaço a partir do topo
                marginLeft: "40px", // Espaço a partir da esquerda
                marginBottom: "50px",
                fontSize: "350%",
              }}
            >
              REGISTRAR OCORRÊNCIA
            </h1>

            <Form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="mb-3"
              style={{ width: "80%", marginLeft: "40px" }}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-5">
                    <Form.Label>MATRÍCULA DO POLICIAL RESPONSÁVEL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a matrícula do policial"
                      isInvalid={!!errors.matricula_policial}
                      {...register("matricula_policial", {
                        required: "Matrícula é obrigatória",
                        pattern: {
                          value: /^[0-9]{8}$/,
                          message: "Matrícula inválida!",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "A matrícula precisa ter no mínimo 8 caracteres.",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.matricula_policial?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <h3 className="mb-3">INFORMAÇÕES GERAIS</h3>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>TIPO</Form.Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      isInvalid={!!errors.tipo_ocorrencia}
                      {...register("tipo_ocorrencia", {
                        required: "Tipo da ocorrência é obrigatório",
                      })}
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
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.tipo_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>STATUS</Form.Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      isInvalid={!!errors.status_ocorrencia}
                      {...register("status_ocorrencia", {
                        required: "Selecione uma opção de status",
                      })}
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
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.status_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>PRIORIDADE</Form.Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      isInvalid={!!errors.prioridade_ocorrencia}
                      {...register("prioridade_ocorrencia", {
                        required: "Selecione uma opção de prioridade",
                      })}
                    >
                      <option value="">
                        Selecione uma opção de prioridade
                      </option>
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.prioridade_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>DATA</Form.Label>
                    <Form.Control
                      type="date"
                      isInvalid={!!errors.data_ocorrencia}
                      {...register("data_ocorrencia", {
                        required: "A data da ocorrência é obrigatória",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.data_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>HORA</Form.Label>
                    <Form.Control
                      type="time"
                      isInvalid={!!errors.hora_ocorrencia}
                      {...register("hora_ocorrencia", {
                        required: "A hora da ocorrência é obrigatória",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.hora_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o CEP da ocorrência"
                      isInvalid={!!errors.cep_ocorrencia}
                      {...register("cep_ocorrencia", {
                        required: "CEP da ocorrência é obrigatório",
                        pattern: {
                          value: /^\d{5}-\d{3}$/,
                          message:
                            "Formato de CEP inválido. Use o formato xxxxx-xxx.",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cep_ocorrencia?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>DESCRIÇÃO</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descreva a ação da ocorrência"
                    rows={4} // Define a altura do campo de texto
                    isInvalid={!!errors.descricao_ocorrencia}
                    {...register("descricao_ocorrencia", {
                      required: "A descrição da ocorrência é obrigatória",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao_ocorrencia?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>
                    DESCRIÇÃO DAS EVIDÊNCIAS
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Descreva as evidências encontradas"
                    isInvalid={!!errors.descricao_evidencias}
                    {...register("descricao_evidencias", {
                      required: "A descrição das evidências é obrigatória",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao_evidencias?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mt-5">
                <Col>
                  <h3>INFORMAÇÕES DA VÍTIMA</h3>
                </Col>

                <Col>
                  <h3>INFORMAÇÕES DO SUSPEITO</h3>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>NOME COMPLETO DA VÍTIMA</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome completo da vítima"
                      isInvalid={!!errors.nome_completo_vitima}
                      {...register("nome_completo_vitima", {
                        required: "O nome completo da vítima é obrigatório",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome_completo_vitima?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>NOME COMPLETO DO SUSPEITO</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome completo do suspeito"
                      isInvalid={!!errors.nome_completo_suspeito}
                      {...register("nome_completo_suspeito", {
                        required: "O nome completo do suspeito é obrigatório",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nome_completo_suspeito?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CPF DA VÍTIMA</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o CPF da vítima"
                      isInvalid={!!errors.cpf_vitima}
                      {...register("cpf_vitima", {
                        required: "CPF da vítima é obrigatório",
                        pattern: {
                          value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                          message: "CPF inválido",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cpf_vitima?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CPF DO SUSPEITO</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o CPF do suspeito"
                      isInvalid={!!errors.cpf_suspeito}
                      {...register("cpf_suspeito", {
                        required: "CPF do suspeito é obrigatório",
                        pattern: {
                          value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                          message: "CPF inválido",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cpf_suspeito?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CONTATO DA VÍTIMA</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o contato da vítima"
                      isInvalid={!!errors.contato_vitima}
                      {...register("contato_vitima", {
                        required: "O contato da vítima é obrigatório",
                        pattern: {
                          value: /^\(\d{2}\) 9\d{4}-\d{4}$/,
                          message:
                            "Formato de contato inválido. Use o formato (xx) 9xxxx-xxxx.",
                        },
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contato_vitima?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>CARACTERÍSTICAS DO SUSPEITO</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descreva as características do suspeito"
                      isInvalid={!!errors.caracteristicas_suspeito}
                      {...register("caracteristicas_suspeito", {
                        required:
                          "A descrição das características do suspeito é obrigatória",
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.caracteristicas_suspeito?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    type="submit"
                    className="mt-4"
                    style={{ backgroundColor: "#19A800", fontSize: "25px" }}
                  >
                    REGISTRAR
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RegistrarOcorrencia;
