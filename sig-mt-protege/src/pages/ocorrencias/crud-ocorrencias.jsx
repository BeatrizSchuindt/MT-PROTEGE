import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Toast, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

import Menu from "../../components/menu-nav";

import IconeSemConexao from '../../images/icone-erro-500.png';
import IconeEditar from "../../images/icone-editar.png";
import IconeExcluir from "../../images/icone-excluir.png";
import IconeAvisoExcluir from '../../images/icone-aviso.png';
import IconeRegistrar from "../../images/icone-registrar-ocorrencia.png";

import { filtroOcorrencias } from "../../services/ocorrencia-services";
import { getOcorrencias } from "../../services/ocorrencia-services";
import { updateOcorrencia } from "../../services/ocorrencia-services";
import { deleteOcorrencia } from "../../services/ocorrencia-services";

function Ocorrencias() {
  //Declarando funções do hook-form - para o FILTRO DE OCORRÊNCIAS
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [toastUpdateShow, setToastUpdateShow] = useState(false);
  const [toastDeleteShow, setToastDeleteShow] = useState(false);
  const [showModalCaiu, setShowModalCaiu] = useState(false);
  const navigate = useNavigate();

  //declarando estados dos componentes
  const [ocorrencias, setOcorrencias] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedOcorrencia, setSelectedOcorrencia] = useState(null);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingOcorrencia, setDeletingOcorrencia] = useState(null);

  //submit de read de ocorrências - COM OU SEM FILTRO
  const onSubmit = async (data) => {
    try {
      const result = await filtroOcorrencias(data); // Passar os dados do formulário
      setOcorrencias(result.data);
    } catch (error) {
      console.log(error);
      setError(error.toString());
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  };

  const showDeleteConfirmation = (ocorrencia) => {
    setDeletingOcorrencia(ocorrencia);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingOcorrencia(null);
  };

  const confirmDelete = async () => {
    if (deletingOcorrencia) {
      try {
        await deleteOcorrencia(deletingOcorrencia.id);
        // Remova a ocorrência excluída do estado
        setOcorrencias(ocorrencias.filter((ocorrencia) => ocorrencia.id !== deletingOcorrencia.id));
        setShowDeleteModal(false);
        setDeletingOcorrencia(null);
        setToastDeleteShow(true);
      } catch (error) {
        console.error("Erro ao deletar a ocorrência:", error);
        if (error.response.status === 500) {
          setShowModalCaiu(true);
        }
      }
    }
  };

  const updatingOcorrencia = async (data) => {
    setIsUpdating(data);
    console.log(isUpdating);
  }

  const editOcorrencia = async (data) => {
    try {
      await updateOcorrencia(data);
      setIsUpdating(null);
      setToastUpdateShow(true);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  }

  useEffect(() => {
    async function setEditingData(editingData) {
      setValue("id", editingData.id);
      setValue("matricula_policial", editingData.matricula_policial);
      setValue("data_ocorrencia", editingData.data_ocorrencia);
      setValue("hora_ocorrencia", editingData.hora_ocorrencia);
      setValue("cep_ocorrencia", editingData.cep_ocorrencia);
      setValue("tipo_ocorrencia", editingData.tipo_ocorrencia);
      setValue("prioridade_ocorrencia", editingData.prioridade_ocorrencia);
      setValue("status_ocorrencia", editingData.status_ocorrencia);
      setValue("descricao_ocorrencia", editingData.descricao_ocorrencia);
      setValue("nome_completo_vitima", editingData.nome_completo_vitima);
      setValue("cpf_vitima", editingData.cpf_vitima);
      setValue("contato_vitima", editingData.contato_vitima);
      setValue("nome_completo_suspeito", editingData.nome_completo_suspeito);
      setValue("cpf_suspeito", editingData.cpf_suspeito);
      setValue("caracteristicas_suspeito", editingData.caracteristicas_suspeito);
      setValue("descricao_evidencias", editingData.descricao_evidencias);
    }
    async function fetchData() {
      const result = await getOcorrencias();
      setOcorrencias(result.data);
    }

    fetchData();

    if (isUpdating) setEditingData(isUpdating);
  }, [isUpdating]);

  const handleClose = () => {
    setShow(false);
    if (isUpdating) {
      setIsUpdating(null);
      reset();
    }

  }

  const handleShow = (ocorrencia) => {
    setSelectedOcorrencia(ocorrencia);
    setShow(true);
  };

  const handleCloseModalCaiu = () => setShowModalCaiu(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
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
                  onClick={() => navigate('/registrar-ocorrencia')}
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
            validated={!errors}
            reset
            onSubmit={handleSubmit(onSubmit)}
          >
            <div style={{ width: "90%", marginLeft: "40px" }}>
              <label
                htmlFor="filtros_disponiveis"
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
                      isValid={!errors.id}
                      isInvalid={errors.id}
                      required
                      {...register("id")}
                    />
                    {errors.id && (
                      <p className="hook-form-error">{errors.id.message}</p>
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
              </Row>

              <Row>
                <Col>
                  <select
                    className={`form-select ${errors.status_ocorrencia ? "is-invalid" : ""
                      }`}
                    name="status_ocorrencia"
                    id="status_ocorrencia"
                    placeholder="Busque pelo status da ocorrência"
                    required
                    {...register("status_ocorrencia")}
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
                  {errors.status_ocorrencia && (
                    <p className="hook-form-error">
                      {errors.status_ocorrencia.message}
                    </p>
                  )}
                </Col>

                <Col>
                  <select
                    className={`form-select ${errors.tipo_ocorrencia ? "is-invalid" : ""
                      }`}
                    name="tipo_ocorrencia"
                    id="tipo_ocorrencia"
                    placeholder="Selecione o tipo de ocorrência"
                    required
                    {...register("tipo_ocorrencia")}
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
                  {errors.tipo_ocorrencia && (
                    <p className="hook-form-error">
                      {errors.tipo_ocorrencia.message}
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
                    isValid={!errors.data_ocorrencia}
                    isInvalid={errors.data_ocorrencia}
                    required
                    {...register("data_ocorrencia")}
                  />
                  {errors.data_ocorrencia && (
                    <p className="hook-form-error">
                      {errors.data_ocorrencia.message}
                    </p>
                  )}
                </Col>
              </Row>
            </div>

            {error && <p className="text-danger" style={{ textAlign: 'center', marginTop: '10px', fontSize: '25px' }}>ERRO INTERNO: {error}</p>}

            <div
              style={{ width: "90%", marginLeft: "40px", paddingTop: "15px" }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
                style={{ backgroundColor: "#00296B" }}
              >
                BUSCAR
              </button>

              <button
                className="btn btn-primary"
                onClick={() => reset()}
                style={{ backgroundColor: "transparent", color: "black", marginLeft: "20px" }}
              >
                LIMPAR FILTRO
              </button>
            </div>
          </form>

          {/*MODAL DE DETALHES*/}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>DETALHES DA OCORRÊNCIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Exiba os detalhes da ocorrência selecionada aqui */}
              {selectedOcorrencia && (
                <div>
                  <p>ID: {selectedOcorrencia.id}</p>
                  <p>
                    Matrícula Policial: {selectedOcorrencia.matricula_policial}
                  </p>
                  <p>Data: {selectedOcorrencia.data_ocorrencia}</p>
                  <p>Hora: {selectedOcorrencia.hora_ocorrencia}</p>
                  <p>CEP: {selectedOcorrencia.cep_ocorrencia}</p>
                  <p>Tipo: {selectedOcorrencia.tipo_ocorrencia}</p>
                  <p>Prioridade: {selectedOcorrencia.prioridade_ocorrencia}</p>
                  <p>Status: {selectedOcorrencia.status_ocorrencia}</p>
                  <p>Descrição: {selectedOcorrencia.descricao_ocorrencia}</p>
                  <p>
                    Nome da Vítima: {selectedOcorrencia.nome_completo_vitima}
                  </p>
                  <p>CPF da Vítima: {selectedOcorrencia.cpf_vitima}</p>
                  <p>Contato da Vítima: {selectedOcorrencia.contato_vitima}</p>
                  <p>
                    Nome do Suspeito:{" "}
                    {selectedOcorrencia.nome_completo_suspeito}
                  </p>
                  <p>CPF do suspeito: {selectedOcorrencia.cpf_suspeito}</p>
                  <p>
                    Características do suspeito:{" "}
                    {selectedOcorrencia.caracteristicas_suspeito}
                  </p>
                  <p>
                    Descrição das evidências:{" "}
                    {selectedOcorrencia.descricao_evidencias}
                  </p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* //MODAL DE EDIÇÃO */}
          <Modal show={isUpdating} onHide={() => setIsUpdating(null)}>
            <Modal.Header >
              <Modal.Title>EDITAR OCORRÊNCIA</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={!errors} reset onSubmit={handleSubmit(editOcorrencia)}>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group className="mb-5">
                      <Form.Label>MATRÍCULA DO POLICIAL RESPONSÁVEL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Insira a matrícula do policial"
                        isInvalid={!!errors.matricula_policial}
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
                        {...register("tipo_ocorrencia")}
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
                        {...register("status_ocorrencia")}
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
                        {...register("prioridade_ocorrencia")}
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
                        {...register("data_ocorrencia")}
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
                        {...register("hora_ocorrencia")}
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
                      {...register("descricao_ocorrencia")}
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
                      {...register("descricao_evidencias")}
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
                        {...register("nome_completo_vitima")}
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
                        {...register("nome_completo_suspeito")}
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
                        {...register("caracteristicas_suspeito")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.caracteristicas_suspeito?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' type='submit'>Atualizar</Button>
                <Button variant="outline" onClick={handleClose}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          {/*TABELA DE OCORRÊNCIAS*/}
          <div className="ocorrencias-page-area" style={{ marginLeft: "40px" }}>
            <div className="ocorrencia-area" style={{ height: "100vh", overflowY: "auto", overflowX: "auto" }}>
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
                        DETALHES
                      </th>
                      <th className="text-center" scope="col">
                        EDITAR
                      </th>
                      <th className="text-center" scope="col">
                        DELETAR
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
                            onClick={() => handleShow(ocorrencia)}
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
                          <button
                            onClick={() => updatingOcorrencia(ocorrencia)}
                            style={{
                              backgroundColor: "blue",
                              border: "none",
                              borderRadius: "100px",
                            }}
                          >
                            <img
                              className="ocorrencia-row-icon"
                              src={IconeEditar}
                              alt="Ícone Editar ocorrencia"
                            />
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => showDeleteConfirmation(ocorrencia)}
                            style={{
                              backgroundColor: "red",
                              border: "none",
                              borderRadius: "100px",
                            }}
                          >
                            <img
                              className="ocorrencia-row-icon"
                              src={IconeExcluir}
                              alt="Ícone Deletar ocorrência"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center" style={{ fontSize: '1.5rem' }}>NENHUMA OCORRÊNCIA ENCONTRADA</p>
              )}
            </div>
          </div>
          <Modal show={showDeleteModal} onHide={cancelDelete}>
            <Modal.Header closeButton>
              <Modal.Title>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={IconeAvisoExcluir}
                      alt="Icone Aviso Excluir"
                      style={{ width: '64px' }}
                    />
                  </Col>
                  <Col>
                    <p className="mb-0">EXCLUIR OCORRÊNCIA</p>
                  </Col>
                </Row>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: '1.3rem' }}>Tem certeza de que deseja excluir a ocorrência selecionada?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={confirmDelete}>
                Excluir
              </Button>
              <Button variant="secondary" onClick={cancelDelete}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>

          <Toast
            onClose={() => setToastUpdateShow(false)}
            show={toastUpdateShow}
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
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Toast.Header style={{ backgroundColor: "blue" }}>
              <strong className="mr-auto" style={{ color: 'white' }}>OCORRÊNCIA ATUALIZADA</strong>
            </Toast.Header>
            <Toast.Body>Sua ocorrência foi atualizada com sucesso!</Toast.Body>
          </Toast>

          <Toast
            onClose={() => setToastDeleteShow(false)}
            show={toastDeleteShow}
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
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Toast.Header style={{ backgroundColor: "red" }}>
              <strong className="mr-auto" style={{ color: 'white' }}>OCORRÊNCIA DELETADA</strong>
            </Toast.Header>
            <Toast.Body>Sua ocorrência foi DELETADA com sucesso!</Toast.Body>
          </Toast>
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

export default Ocorrencias;