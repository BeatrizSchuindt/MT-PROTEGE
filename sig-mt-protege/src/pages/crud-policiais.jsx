import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

import Menu from "../components/menu-nav";

import { filtroPoliciais as fetchPoliciais } from "../services/policial-services";

function Policiais() {
  const {
    handleSubmit,
    register,
    reset,
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
       <Menu/>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="col" style={{ height: "100vh", overflowY: "auto" }}>
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

              <button
                className="btn btn-primary"
                onClick={() => reset()}
                style={{ backgroundColor: "transparent", color: "black", marginLeft: "20px" }}
              >
                LIMPAR FILTRO
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
