<Modal
            show={modalShow.novaOcorrencia}
            onHide={() => handleClose("novaOcorrencia")}
          >
            <Modal.Header closeButton>
              <Modal.Title>REGISTRAR NOVA OCORRÊNCIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <form onSubmit={handleSubmit2(onSubmitCreate)}>
                  <div className="mb-3">
                    <label htmlFor="matricula_policial" className="form-label">
                      Matrícula do policial responsável
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="matricula_policial"
                      {...register2("matricula_policial", {
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
                    {errors2.matricula_policial && (
                      <span className="text-danger">
                        {errors2.matricula_policial.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="data_ocorrencia" className="form-label">
                      DATA DA OCORRÊNCIA
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="data_ocorrencia"
                      {...register2("data_ocorrencia", {
                        required: "Data da ocorrência é obrigatória",
                      })}
                    />
                    {errors2.data_ocorrencia && (
                      <span className="text-danger">
                        {errors2.data_ocorrencia.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="data_ocorrencia" className="form-label">
                      HORA DA OCORRÊNCIA
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora_ocorrencia"
                      {...register2("hora_ocorrencia", {
                        required: "Hora da ocorrência é obrigatória",
                      })}
                    />
                    {errors2.hora_ocorrencia && (
                      <span className="text-danger">
                        {errors2.hora_ocorrencia.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cep_ocorrencia" className="form-label">
                      CEP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cep_ocorrencia"
                      {...register2("cep_ocorrencia", {
                        required: { message: "CEP é obrigatório" },
                        pattern: {
                          value: /^\d{5}-\d{3}$/,
                          message:
                            "Formato de CEP inválido. Use o formato xxxxx-xxx.",
                        },
                      })}
                    />
                    {errors2.cep_ocorrencia && (
                      <span className="text-danger">
                        {errors2.cep_ocorrencia.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="tipo_ocorrencia"
                      className="form-label form-large-font"
                      style={{ fontWeight: "Bold" }}
                    >
                      TIPO
                    </label>
                    <select
                      className={`form-select ${
                        errors2.tipo_ocorrencia ? "is-invalid" : ""
                      }`}
                      name="tipo_ocorrencia"
                      id="tipo_ocorrencia"
                      placeholder="Selecione o tipo de ocorrência"
                      required
                      {...register2("tipo_ocorrencia", {
                        required: {
                          message: "Tipo de ocorrência é obrigatório",
                        },
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
                    </select>
                    {errors2.tipo_ocorrencia && (
                      <p className="hook-form-error">
                        {errors2.tipo_ocorrencia.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="prioridade_ocorrencia"
                      className="form-label form-large-font"
                      style={{ fontWeight: "Bold" }}
                    >
                      PRIORIDADE
                    </label>
                    <select
                      className={`form-select ${
                        errors2.prioridade_ocorrencia ? "is-invalid" : ""
                      }`}
                      name="prioridade_ocorrencia"
                      id="prioridade_ocorrencia"
                      placeholder="Selecione a prioridade da ocorrência"
                      required
                      {...register2("prioridade_ocorrencia", {
                        required: { message: "Prioridade é obrigatório" },
                      })}
                    >
                      <option value="">
                        Selecione a prioridade da ocorrência
                      </option>
                      <option value="Alta">Alta</option>
                      <option value="Média">Média</option>
                      <option value="Baixa">Baixa</option>
                    </select>
                    {errors2.prioridade_ocorrencia && (
                      <p className="hook-form-error">
                        {errors2.prioridade_ocorrencia.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="status_ocorrencia"
                      className="form-label form-large-font"
                      style={{ fontWeight: "Bold" }}
                    >
                      STATUS
                    </label>
                    <select
                      className={`form-select ${
                        errors2.status_ocorrencia ? "is-invalid" : ""
                      }`}
                      name="status_ocorrencia"
                      id="status_ocorrencia"
                      placeholder="Selecione o status da ocorrência"
                      required
                      {...register2("status_ocorrencia", {
                        required: { message: "Status é obrigatório" },
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
                    </select>
                    {errors2.status_ocorrencia && (
                      <p className="hook-form-error">
                        {errors2.status_ocorrencia.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="descricao_ocorrencia"
                      className="form-label"
                    >
                      DESCRIÇÃO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="descricao_ocorrencia"
                      {...register2("descricao_ocorrencia", {
                        required: { message: "Descrição é obrigatória" },
                      })}
                    />
                    {errors2.descricao_ocorrencia && (
                      <span className="text-danger">
                        {errors2.descricao_ocorrencia.message}
                      </span>
                    )}
                  </div>

                  {/* Outros campos de formulário */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleClose("novaOcorrencia")}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </Modal.Body>
          </Modal>