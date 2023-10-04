import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col, Toast, Modal, Button } from "react-bootstrap";
import { updatePolicial, getPolicialID, deletarPolicial } from "../services/policial-services";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import IconeSemConexao from '../images/icone-erro-500.png';
import IconeAvisoSair from '../images/icone-aviso.png';
import IconeDesativada from '../images/icone-sucesso-desativada.png';

import Menu from "../components/menu-nav";

function EditarPerfil() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    getValues
  } = useForm({ mode: "onChange" });

  const [toastShow, setToastShow] = useState(false);
  const [showModalCaiu, setShowModalCaiu] = useState(false);

  const navigate = useNavigate();

  const [policial, setPolicial] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModalSucesso, setShowModalSucesso] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editProfile = async (data) => {
    try {
      await updatePolicial(data);
      setToastShow(true);
    } catch (error) {
      console.log("Erro na atualização:", error);
      setError(error.message);
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  };

  const removePolicial = async () => {
    try {
      const id = getValues("id");
      console.log(id)
      await deletarPolicial(id);
      setShowModalSucesso(true);
    } catch (error) {
      console.log("Erro ao desativar o perfil:", error);
      if (error.response.status === 500) {
        setShowModalCaiu(true);
      }
    }
  }

  useEffect(() => {
    const getPolicial = async () => {
      const token = sessionStorage.getItem("token");
      const jwt_token = jwt_decode(token);
      try {
        const result = await getPolicialID(jwt_token.id);
        setPolicial(result.data);
        setValue("senha", result.data.senha);
        setValue("nome_completo", result.data.nome_completo);
        setValue("data_nascimento", result.data.data_nascimento);
        setValue("genero", result.data.genero);
        setValue("cpf_policial", result.data.cpf_policial);
        setValue("rg_policial", result.data.rg_policial);
        setValue("naturalidade", result.data.naturalidade);
        setValue("email", result.data.email);
        setValue("celular", result.data.celular);
        setValue("cep_policial", result.data.cep_policial);
        setValue("numero_endereco", result.data.numero_endereco);
        setValue("cargo_graduacao", result.data.cargo_graduacao);
        setValue("data_ingresso_policia", result.data.data_ingresso_policia);
        setValue("unidade_policia", result.data.unidade_policia);
        setValue("jurisdicao", result.data.jurisdicao);
        setValue("id", result.data.id);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPolicial();
  }, []);

  const handleCloseModalCaiu = () => setShowModalCaiu(false);

  return (
    <div className="container-fluid">
      <div className="row">
        {/*MENU DE NAVEGAÇÃO */}
        <Menu />

        <Modal show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Row className="align-items-center">
                <Col xs="auto">
                  <img
                    src={IconeAvisoSair}
                    alt="Icone Aviso Desativar"
                    style={{ width: '64px' }}
                  />
                </Col>
                <Col>
                  <p className="mb-0">DESATIVAR CONTA</p>
                </Col>
              </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: '1.3rem' }}>Tem certeza de que deseja desativar a sua conta?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => removePolicial()}>
              Excluir
            </Button>
            <Button variant="secondary" onClick={() => { setShowDeleteModal(false) }}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* CONTEÚDO DA PÁGINA */}
        <main
          className="col d-flex flex-column align-items-center"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <h1
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "350%",
            }}
          >
            EDITAR PERFIL
          </h1>

          <div style={{ width: "90%" }}>
            <form
              className="mb-3"
              noValidate
              validated={!errors}
              onSubmit={handleSubmit(editProfile)}
            >
              <h3 className="mb-3">INFORMAÇÕES PESSOAIS</h3>
              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="nomecompleto"
                      className="form-label form-large-font"
                    >
                      NOME COMPLETO
                    </label>
                    <input
                      className="form-control"
                      label="NomeCompleto"
                      type="text"
                      name="nome_completo"
                      placeholder="Insira seu nome completo"
                      isValid={!errors.nome_completo}
                      isInvalid={errors.nome_completo}
                      required
                      {...register("nome_completo", {
                        required: { message: "Nome completo é obrigatório" },
                      })}
                    />
                    {errors.nome_completo && (
                      <p className="hook-form-error">
                        {errors.nome_completo.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="senha"
                      className="form-label form-large-font"
                    >
                      SENHA
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="senha"
                      name="senha"
                      placeholder="Digite sua senha"
                      error={errors.senha}
                      required
                      {...register("senha", {
                        required: { message: "A senha é obrigatória." },
                        minLength: {
                          value: 6,
                          message:
                            "A senha precisa ter no mínimo 6 caracteres.",
                        },
                      })}
                    />
                    {errors.senha && (
                      <p className="hook-form-error">{errors.senha.message}</p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="data_nascimento"
                      className="form-label form-large-font"
                    >
                      DATA DE NASCIMENTO
                    </label>
                    <input
                      className="form-control"
                      label="DataNascimento"
                      type="date"
                      name="data_nascimento"
                      placeholder=""
                      isValid={!errors.data_nascimento}
                      isInvalid={errors.data_nascimento}
                      required
                      {...register("data_nascimento", {
                        required: {
                          message: "Data de nascimento é obrigatória",
                        },
                      })}
                    />
                    {errors.data_nascimento && (
                      <p className="hook-form-error">
                        {errors.data_nascimento.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="naturalidade"
                      className="form-label form-large-font"
                    >
                      NATURALIDADE
                    </label>
                    <input
                      className="form-control"
                      label="Naturalidade"
                      type="text"
                      name="naturalidade"
                      placeholder="Insira sua naturalidade"
                      isValid={!errors.naturalidade}
                      isInvalid={errors.naturalidade}
                      required
                      {...register("naturalidade", {
                        required: { message: "Naturalidade é obrigatória" },
                        pattern: {
                          value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                          message: "Use apenas letras e espaços.",
                        },
                      })}
                    />
                    {errors.naturalidade && (
                      <p className="hook-form-error">
                        {errors.naturalidade.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="genero"
                      className="form-label form-large-font"
                    >
                      GÊNERO
                    </label>
                    <select
                      className={`form-select ${errors.genero ? "is-invalid" : ""
                        }`}
                      name="genero"
                      id="genero"
                      placeholder="Selecione"
                      required
                      {...register("genero", {
                        required: { message: "Gênero é obrigatório" },
                      })}
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Prefiro não mencionar">
                        Prefiro não mencionar
                      </option>
                    </select>
                    {errors.genero && (
                      <p className="hook-form-error">{errors.genero.message}</p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="cpf_policial"
                      className="form-label form-large-font"
                    >
                      CPF
                    </label>
                    <input
                      className="form-control"
                      label="CPF"
                      type="text"
                      name="cpf_policial"
                      placeholder="Insira seu CPF"
                      isValid={!errors.cpf_policial}
                      isInvalid={errors.cpf_policial}
                      required
                      {...register("cpf_policial", {
                        required: { message: "CPF é obrigatório" },
                        pattern: {
                          value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                          message: "CPF inválido",
                        },
                      })}
                    />
                    {errors.cpf_policial && (
                      <p className="hook-form-error">
                        {errors.cpf_policial.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="rg_policial"
                      className="form-label form-large-font"
                    >
                      RG
                    </label>
                    <input
                      className="form-control"
                      label="RG"
                      type="text"
                      name="rg_policial"
                      placeholder="Insira seu RG"
                      isValid={!errors.rg_policial}
                      isInvalid={errors.rg_policial}
                      required
                      {...register("rg_policial", {
                        required: { message: "RG é obrigatório" },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "RG inválido. Insira apenas números.",
                        },
                      })}
                    />
                    {errors.rg_policial && (
                      <p className="hook-form-error">
                        {errors.rg_policial.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="celular"
                      className="form-label form-large-font"
                    >
                      CELULAR
                    </label>
                    <input
                      className="form-control"
                      label="Celular"
                      type="text"
                      name="celular"
                      placeholder="Insira seu número de celular"
                      isValid={!errors.celular}
                      isInvalid={errors.celular}
                      required
                      {...register("celular", {
                        required: { message: "Celular é obrigatório" },
                        pattern: {
                          value: /^\(\d{2}\) 9\d{4}-\d{4}$/,
                          message:
                            "Formato de celular inválido. Use o formato (xx) 9xxxx-xxxx.",
                        },
                      })}
                    />
                    {errors.celular && (
                      <p className="hook-form-error">
                        {errors.celular.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label form-large-font"
                    >
                      E-MAIL
                    </label>
                    <input
                      className="form-control"
                      label="Email"
                      type="text"
                      name="email"
                      placeholder="Insira seu email"
                      isValid={!errors.email}
                      isInvalid={errors.email}
                      required
                      {...register("email", {
                        required: { message: "Email é obrigatório" },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message:
                            "Email inválido. Insira um endereço de email válido.",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="hook-form-error">{errors.email.message}</p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <h3>INFORMAÇÕES DE ENDEREÇO</h3>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="cep_policial"
                      className="form-label form-large-font"
                    >
                      CEP
                    </label>
                    <input
                      className="form-control"
                      label="CEP"
                      type="text"
                      name="cep_policial"
                      placeholder="Insira seu CEP"
                      isValid={!errors.cep_policial}
                      isInvalid={errors.cep_policial}
                      required
                      {...register("cep_policial", {
                        required: { message: "CEP é obrigatório" },
                        pattern: {
                          value: /^\d{5}-\d{3}$/,
                          message:
                            "Formato de CEP inválido. Use o formato xxxxx-xxx.",
                        },
                      })}
                    />
                    {errors.cep_policial && (
                      <p className="hook-form-error">
                        {errors.cep_policial.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="numero_endereco"
                      className="form-label form-large-font"
                    >
                      NÚMERO DE ENDEREÇO
                    </label>
                    <input
                      className="form-control"
                      label="NumeroEndereco"
                      type="text"
                      name="numero_endereco"
                      placeholder="Insira o número do seu endereço"
                      isValid={!errors.numero_endereco}
                      isInvalid={errors.numero_endereco}
                      required
                      {...register("numero_endereco", {
                        required: {
                          message: "Número de endereço é obrigatório",
                        },
                        pattern: {
                          value: /^\d+$/,
                          message: "Insira apenas números.",
                        },
                      })}
                    />
                    {errors.numero_endereco && (
                      <p className="hook-form-error">
                        {errors.numero_endereco.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="mt-4">
                <h3>INFORMAÇÕES SOBRE O POLICIAL</h3>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="jurisdicao"
                      className="form-label form-large-font"
                    >
                      JURISDIÇÃO
                    </label>
                    <select
                      className={`form-select ${errors.jurisdicao ? "is-invalid" : ""
                        }`}
                      name="jurisdicao"
                      id="jurisdicao"
                      placeholder="Selecione a jurisdição"
                      required
                      {...register("jurisdicao", {
                        required: { message: "Jurisdição é obrigatório" },
                      })}
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Civil">Civil</option>
                      <option value="Militar">Militar</option>
                    </select>
                    {errors.jurisdicao && (
                      <p className="hook-form-error">
                        {errors.jurisdicao.message}
                      </p>
                    )}
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="data_ingresso_policia"
                      className="form-label form-large-font"
                    >
                      DATA DE INGRESSO NA POLÍCIA
                    </label>
                    <input
                      className="form-control"
                      label="DataIngressoPolicia"
                      type="date"
                      name="data_ingresso_policia"
                      placeholder=""
                      isValid={!errors.data_ingresso_policia}
                      isInvalid={errors.data_ingresso_policia}
                      required
                      {...register("data_ingresso_policia", {
                        required: { message: "Data de igresso é obrigatória" },
                      })}
                    />
                    {errors.data_ingresso_policia && (
                      <p className="hook-form-error">
                        {errors.data_ingresso_policia.message}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="cargo_graduacao"
                      className="form-label form-large-font"
                    >
                      CARGO/GRADUAÇÃO
                    </label>
                    <input
                      className="form-control"
                      label="CargoGraduacao"
                      type="text"
                      name="cargo_graduacao"
                      placeholder="Insira seu cargo/graduação"
                      isValid={!errors.cargo_graduacao}
                      isInvalid={errors.cargo_graduacao}
                      required
                      {...register("cargo_graduacao", {
                        required: { message: "Cargo/Graduação é obrigatório" },
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
                  </div>
                </Col>

                <Col>
                  <div className="mb-3">
                    <label
                      htmlFor="unidade_policia"
                      className="form-label form-large-font"
                    >
                      UNIDADE POLICIAL
                    </label>
                    <input
                      className="form-control"
                      label="UnidadePolicial"
                      type="text"
                      name="unidade_policia"
                      placeholder="Insira sua unidade policial"
                      isValid={!errors.unidade_policia}
                      isInvalid={errors.unidade_policia}
                      required
                      {...register("unidade_policia", {
                        required: { message: "Unidade policial é obrigatória" },
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
                  </div>
                </Col>
              </Row>

              {error && <p className="text-danger" style={{ textAlign: 'center', marginTop: '10px', fontSize: '25px' }}>ERRO INTERNO: {error}</p>}

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-4"
                  disabled={!isValid}
                  style={{
                    backgroundColor: "#19A800",
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                >
                  ATUALIZAR
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-4"
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    marginLeft: "50px"
                  }}
                  onClick={() => {
                    setShowDeleteModal(true)
                    setToastShow(false);
                  }}>
                  DESATIVAR CONTA
                </button>
              </div>
            </form>
          </div>
          <Toast
            onClose={() => setToastShow(false)}
            show={toastShow}
            delay={5000}
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
              backgroundColor: "#FFFFFF", // define a cor de fundo do Toast para branco
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Toast.Header style={{ backgroundColor: "#1ECB00" }}>
              <strong style={{color: '#F2F2F2'}}>ATUALIZADO!</strong>
            </Toast.Header>
            <Toast.Body>Seu perfil foi atualizado com sucesso!</Toast.Body>
          </Toast>

          <Modal show={showModalSucesso}>
            <Modal.Header>
              <Modal.Title>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <img
                      src={IconeDesativada}
                      alt="Icone desativada sucesso"
                      style={{ width: '64px' }}
                    />
                  </Col>
                  <Col>
                    <p className="mb-0">DESATIVADA!</p>
                  </Col>
                </Row>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: '1.3rem' }}>Sua conta no sistema foi desativada com sucesso!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => navigate('/')}>
                SAIR DO SISTEMA
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

export default EditarPerfil;
