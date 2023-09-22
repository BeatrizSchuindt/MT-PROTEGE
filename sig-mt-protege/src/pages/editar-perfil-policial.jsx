import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { updatePolicial, getPolicialID } from "../services/policial-services";

import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/logo-definitiva-mt-protege.png";
import IconeLogout from "../images/icone-logout.png";
import IconePainelPrincipal from "../images/icone-painel-principal.png";
import IconePolicia from "../images/icone-policia.png";
import IconePerfil from "../images/icone-perfil.png";
import IconeOcorrencia from "../images/icone-ocorrencia.png";
import IconeAjuda from "../images/icone-ajuda.png";
import "./styles/styles.css";

function EditarPerfil() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const [policial, setPolicial] = useState(null);
  const [loading, setLoading] = useState(true);

  const editProfile = async (data) => {
    try {
      console.log("Dados enviados para atualização:", data);
      const response = await updatePolicial(data);
      console.log("Resposta da atualização:", response);
    } catch (error) {
      console.log("Erro na atualização:", error);
    }
  };

  useEffect(() => {
    const getPolicial = async () => {
      const token = sessionStorage.getItem("token");
      const jwt_token = jwt_decode(token);
      try {
        const result = await getPolicialID(jwt_token.id);
        setPolicial(result.data);
        console.log(result);
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
          <ul className="nav flex-column" style={{ width: "0%" }}>
            <li className="nav-item" style={{}}>
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
              <a className="nav-link text-light" href="/editar-perfilpolicial">
                <img
                  src={IconePerfil}
                  alt="Icone Perfil"
                  className="icones-menu-nav"
                />
                EDITAR PERFIL
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
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
          <h1>EDITAR PERFIL</h1>
          <form
            className="mb-3"
            noValidate
            validated={!errors}
            onSubmit={handleSubmit(editProfile)}
          >
            <Row>
              <Col>
                <div className="mb-3">
                  <label
                    htmlFor="senha"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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
                        message: "A senha precisa ter no mínimo 6 caracteres.",
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
              <div className="mb-3">
                <label
                  htmlFor="nomecompleto"
                  className="form-label form-large-font"
                  style={{ fontWeight: "Bold" }}
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
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label
                    htmlFor="data_nascimento"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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
                      required: { message: "Data de nascimento é obrigatória" },
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
                    htmlFor="genero"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
                  >
                    GÊNERO
                  </label>
                  <select
                    className={`form-select ${
                      errors.genero ? "is-invalid" : ""
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
                    style={{ fontWeight: "Bold" }}
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
                    style={{ fontWeight: "Bold" }}
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
                    htmlFor="naturalidade"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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
                    htmlFor="celular"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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
                    <p className="hook-form-error">{errors.celular.message}</p>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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

            <Row>
              <Col>
                <div className="mb-3">
                  <label
                    htmlFor="cep_policial"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
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
                    style={{ fontWeight: "Bold" }}
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
                      required: { message: "Número de endereço é obrigatório" },
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

            <Row>
              <Col>
                <div className="mb-3">
                  <label
                    htmlFor="jurisdicao"
                    className="form-label form-large-font"
                    style={{ fontWeight: "Bold" }}
                  >
                    JURISDIÇÃO
                  </label>
                  <select
                    className={`form-select ${
                      errors.jurisdicao ? "is-invalid" : ""
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
                    style={{ fontWeight: "Bold" }}
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
                    style={{ fontWeight: "Bold" }}
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
                    style={{ fontWeight: "Bold" }}
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
                ENTRAR
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditarPerfil;
