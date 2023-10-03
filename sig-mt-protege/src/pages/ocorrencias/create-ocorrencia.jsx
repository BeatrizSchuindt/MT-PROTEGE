import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import jwt_decode from 'jwt-decode';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

import Menu from "../../components/menu-nav";

import IconeSemConexao from '../../images/icone-erro-500.png';
import IconeSucesso from '../../images/icone-sucesso-verde.png';

import { createOcorrencia } from "../../services/ocorrencia-services";

function RegistrarOcorrencia() {
  const [matricula, setMatricula] = useState("")
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const jwt_token = jwt_decode(token);
    setMatricula(jwt_token.id)
  }, [])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [error, setError] = useState();
  const [showModalCaiu, setShowModalCaiu] = useState(false);
  const [showModalSucesso, setShowModalSucesso] = useState(false)
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      await createOcorrencia({
        ...data, matricula_policial: matricula
      });
      setShowModalSucesso(true);
    } catch (error) {
      console.log(error)
      setError(error.message);
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  };

  const handleCloseModalCaiu = () => setShowModalCaiu(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

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
                      defaultValue={matricula}
                      isInvalid={!!errors.matricula_policial}
                      disabled
                      {...register("matricula_policial", {
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
              
              {error && <p className="text-danger" style={{textAlign:'center', marginTop:'10px', fontSize:'25px'}}>ERRO INTERNO: {error}</p>}
              
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
          <Modal show={showModalSucesso}>
            <Modal.Header>
              <Modal.Title>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={IconeSucesso}
                      alt="Icone sucesso ocorrência"
                      style={{ width: '64px' }}
                    />
                  </Col>
                  <Col>
                    <p className="mb-0">REGISTRADA!</p>
                  </Col>
                </Row>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: '1.3rem' }}>Essa ocorrência foi registrada com sucesso!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => navigate('/ocorrencias')}>
                Voltar para OCORRÊNCIAS
              </Button>
            </Modal.Footer>
          </Modal>
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

export default RegistrarOcorrencia;
