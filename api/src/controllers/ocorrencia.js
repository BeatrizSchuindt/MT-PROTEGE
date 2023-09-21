const { HttpHelper } = require("../utils/http-helper");
const { OcorrenciaModel } = require("../models/ocorrencia");
const { Validates } = require("../utils/validates");
const { Op } = require("sequelize");

class OcorrenciaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                matricula_policial,
                data_ocorrencia,
                hora_ocorrencia,
                cep_ocorrencia,
                tipo_ocorrencia,
                prioridade_ocorrencia,
                status_ocorrencia,
                descricao_ocorrencia,
                nome_completo_vitima,
                cpf_vitima,
                contato_vitima,
                nome_completo_suspeito,
                cpf_suspeito,
                caracteristicas_suspeito,
                descricao_evidencias,
            } = request.body;

            // Verificar se todos os campos necessários estão presentes nos dados da requisição
            if (
                !matricula_policial ||
                !data_ocorrencia ||
                !hora_ocorrencia ||
                !cep_ocorrencia ||
                !tipo_ocorrencia ||
                !prioridade_ocorrencia ||
                !status_ocorrencia ||
                !descricao_ocorrencia ||
                !descricao_evidencias
            ) {
                return httpHelper.badRequest("Parâmetros inválidos!");
            }

            // Crie a ocorrência no banco de dados
            const ocorrencia = await OcorrenciaModel.create({
                matricula_policial,
                data_ocorrencia,
                hora_ocorrencia,
                cep_ocorrencia,
                tipo_ocorrencia,
                prioridade_ocorrencia,
                status_ocorrencia,
                descricao_ocorrencia,
                nome_completo_vitima,
                cpf_vitima,
                contato_vitima,
                nome_completo_suspeito,
                cpf_suspeito,
                caracteristicas_suspeito,
                descricao_evidencias,
            });

            return httpHelper.created(ocorrencia);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            // Consulta todas as ocorrências ordenadas por algum critério, por exemplo, por id
            const ocorrencias = await OcorrenciaModel.findAll({
                order: [["id", "ASC"]], // Pode alterar o critério de ordenação conforme necessário
            });

            return httpHelper.ok(ocorrencias);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getFilter(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            let query = {};
            if (request.body.id) query.id = request.body.id;

            if (request.body.tipo_ocorrencia)
                query.tipo_ocorrencia = {
                    [Op.like]: `%${request.body.tipo_ocorrencia}%`,
                };

            if (request.body.status_ocorrencia)
                query.status_ocorrencia = {
                    [Op.like]: `%${request.body.status_ocorrencia}%`,
                };

            if (request.body.matricula_policial)
                query.matricula_policial = {
                    [Op.like]: `%${request.body.matricula_policial}%`,
                };

            if (request.body.data_ocorrencia)
                query.data_ocorrencia = request.body.data_ocorrencia;

            const ocorrencias = await OcorrenciaModel.findAll({
                where: query,
            });

            return httpHelper.ok(ocorrencias);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;

            // Verificar se o parâmetro de ID foi fornecido
            if (!id) {
                return httpHelper.badRequest("Parâmetros inválidos!");
            }

            // Verificar se a ocorrência existe
            const ocorrencia = await OcorrenciaModel.findOne({
                where: { id: id },
            });

            if (!ocorrencia) {
                return httpHelper.notFound("Ocorrência não encontrada!");
            }

            // Deletar a ocorrência do banco de dados
            await OcorrenciaModel.destroy({ where: { id: id } });

            return httpHelper.ok({
                message: "Ocorrência deletada com sucesso!",
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const {
                matricula_policial,
                data_ocorrencia,
                hora_ocorrencia,
                cep_ocorrencia,
                tipo_ocorrencia,
                prioridade_ocorrencia,
                status_ocorrencia,
                descricao_ocorrencia,
                nome_completo_vitima,
                cpf_vitima,
                contato_vitima,
                nome_completo_suspeito,
                cpf_suspeito,
                caracteristicas_suspeito,
                descricao_evidencias,
            } = request.body;

            // Verificar se o parâmetro de ID foi fornecido
            if (!id) {
                return httpHelper.badRequest("Parâmetros inválidos!");
            }

            // Atualizar a ocorrência no banco de dados
            const [updatedRowCount] = await OcorrenciaModel.update(
                {
                    id,
                    matricula_policial,
                    data_ocorrencia,
                    hora_ocorrencia,
                    cep_ocorrencia,
                    tipo_ocorrencia,
                    prioridade_ocorrencia,
                    status_ocorrencia,
                    descricao_ocorrencia,
                    nome_completo_vitima,
                    cpf_vitima,
                    contato_vitima,
                    nome_completo_suspeito,
                    cpf_suspeito,
                    caracteristicas_suspeito,
                    descricao_evidencias,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            // Verificar se a ocorrência foi encontrada e atualizada com sucesso
            if (updatedRowCount === 0) {
                return httpHelper.notFound("Ocorrência não encontrada!");
            }

            return httpHelper.ok({
                message: "Ocorrência atualizada com sucesso!",
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countOcorrencias(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const ocorrencias = await OcorrenciaModel.count();
            return httpHelper.ok(ocorrencias);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { OcorrenciaController };
