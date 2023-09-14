import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Logo from "../images/logo-definitiva-mt-protege.png";

import { cadastroPolicial } from "../services/policial-services";

function Cadastro() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const policial = await cadastroPolicial(data);
      navigate("/painel-principal");
    } catch (error) {
      setError({ message: error.response.data.error });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#00296B",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="col-12 col-md-6 p-0 d-flex flex-column align-items-center justify-content-start">
        {/* Logo com altura e largura ajustadas */}
        <img src={Logo} alt="Logo" className="mt-4" style={{ width: "30%" }} />
      </div>
      <Container
        style={{
          width: "50%",
          borderRadius: "10px",
          backgroundColor: "white",
          maxHeight: "500px",
          overflow: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#00296B",
            marginBottom: "30px",
          }}
        >
          CADASTRO - POLICIAL
        </h2>
        <form
          className="mb-3"
          noValidate
          validated={!errors}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col>
              <div className="mb-3">
                <label
                  htmlFor="matricula"
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Matrícula
                </label>
                <input
                  className="form-control"
                  label="Matricula"
                  type="text"
                  name="matricula_policial"
                  placeholder="Insira sua matrícula"
                  isValid={!errors.matricula_policial}
                  isInvalid={errors.matricula_policial}
                  required
                  {...register("matricula_policial", {
                    required: { message: "Matrícula é obrigatória" },
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
                {errors.matricula_policial && (
                  <p className="hook-form-error">
                    {errors.matricula_policial.message}
                  </p>
                )}
              </div>
            </Col>

            <Col>
              <div className="mb-3">
                <label
                  htmlFor="senha"
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Senha
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
                className="form-label"
                style={{ fontWeight: "Bold" }}
              >
                Nome completo
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Data de nascimento
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Gênero
                </label>
                <select
                  className={`form-select ${errors.genero ? "is-invalid" : ""}`}
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
                  className="form-label"
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
                  className="form-label"
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Naturalidade
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Celular
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Email
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
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                  className="form-label"
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Número de Endereço
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Jurisdição
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
                  <p className="hook-form-error">{errors.jurisdicao.message}</p>
                )}
              </div>
            </Col>

            <Col>
              <div className="mb-3">
                <label
                  htmlFor="data_ingresso_policia"
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Data de igresso na polícia
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Cargo/Graduação
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
                  className="form-label"
                  style={{ fontWeight: "Bold" }}
                >
                  Unidade Policial
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
              style={{ backgroundColor: "#19A800" }}
            >
              ENTRAR
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Cadastro;
