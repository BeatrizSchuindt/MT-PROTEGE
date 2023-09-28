const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PolicialModel } = require("../models/policial");
const { Op } = require("sequelize");

class PolicialController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                matricula_policial,
                senha,
                nome_completo,
                data_nascimento,
                genero,
                cpf_policial,
                rg_policial,
                naturalidade,
                email,
                celular,
                cep_policial,
                numero_endereco,
                cargo_graduacao,
                data_ingresso_policia,
                unidade_policia,
                jurisdicao,
            } = request.body;
            if (
                !matricula_policial ||
                !senha ||
                !nome_completo ||
                !data_nascimento ||
                !genero ||
                !cpf_policial ||
                !rg_policial ||
                !naturalidade ||
                !email ||
                !celular ||
                !cep_policial ||
                !numero_endereco ||
                !cargo_graduacao ||
                !data_ingresso_policia ||
                !unidade_policia ||
                !jurisdicao
            )
                return httpHelper.badRequest(
                    "Todos os itens são obrigatórios!"
                );

            const policialAlreadyExists = await PolicialModel.findOne({
                where: { matricula_policial },
            });
            if (policialAlreadyExists) {
                if (policialAlreadyExists.situacao === "Inativo") {

                    const senhaHashed = await bcrypt.hash(
                        senha,
                        Number(process.env.SALT)
                    );

                    const policial = await PolicialModel.update({
                        id: matricula_policial,
                        matricula_policial,
                        senha: senhaHashed,
                        nome_completo,
                        data_nascimento: new Date(data_nascimento),
                        genero,
                        cpf_policial,
                        rg_policial,
                        naturalidade,
                        email,
                        celular,
                        cep_policial,
                        numero_endereco,
                        cargo_graduacao,
                        data_ingresso_policia,
                        unidade_policia,
                        jurisdicao,
                        situacao: "Ativo"
                    }, { where: { id: policialAlreadyExists.id } });

                    const accessToken = jwt.sign(
                        { id: matricula_policial },
                        process.env.TOKEN_SECRET,
                        { expiresIn: process.env.TOKEN_EXPIRES_IN }
                    );

                    return httpHelper.created({ accessToken });
                }
                else if (policialAlreadyExists.situacao !== "Inativo") {
                    return httpHelper.badRequest(
                        "Matrícula de policial já cadastrado!"
                    );
                }
            }

            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );

            const policial = await PolicialModel.create({
                id: matricula_policial,
                matricula_policial,
                senha: senhaHashed,
                nome_completo,
                data_nascimento: new Date(data_nascimento),
                genero,
                cpf_policial,
                rg_policial,
                naturalidade,
                email,
                celular,
                cep_policial,
                numero_endereco,
                cargo_graduacao,
                data_ingresso_policia,
                unidade_policia,
                jurisdicao,
            });

            if (!policial)
                return httpHelper.internalError(
                    "Houve um erro ao criar usuário de policial"
                );

            const accessToken = jwt.sign(
                { id: matricula_policial },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );

            return httpHelper.created({ accessToken });

        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { matricula_policial, senha } = request.body;
            if (!matricula_policial || !senha)
                return httpHelper.badRequest(
                    "Matrícula e senha são obrigatórios!"
                );
            const policial = await PolicialModel.findOne({
                where: { matricula_policial },
            });
            if (!policial) {
                return httpHelper.notFound("Usuário policial não encontrado!");
            }
            if (policial.situacao === "Inativo") {
                return httpHelper.notFound("Conta desativada! Cadastre novamente.");
            }
            const isSenhaValida = await bcrypt.compare(senha, policial.senha);
            if (!isSenhaValida)
                return httpHelper.badRequest("Senha incorreta!");
            const accessToken = jwt.sign(
                { id: policial.matricula_policial },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const policiais = await PolicialModel.findAll({
                where: { situacao: "Ativo" },
                order: [["matricula_policial", "ASC"]],
                attributes: { exclude: ["id", "senha"] }
            });

            return httpHelper.ok(policiais);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getFilter(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const policiais = await PolicialModel.findAll({
                where: {
                    nome_completo: {
                        [Op.like]: `%${request.body.nome_completo}%`
                    },
                    cargo_graduacao: {
                        [Op.like]: `%${request.body.cargo_graduacao}%`
                    },
                    jurisdicao: {
                        [Op.like]: `%${request.body.jurisdicao}%`
                    },
                    matricula_policial: {
                        [Op.like]: `%${request.body.matricula_policial}%`,
                    },
                    unidade_policia: {
                        [Op.like]: `%${request.body.unidade_policia}%`
                    },
                    situacao: { [Op.ne]: "Inativo" }
                }, attributes: { exclude: ["id", "senha"] }
            });

            return httpHelper.ok(policiais);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getPolicialID(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const policial = await PolicialModel.findByPk(id, { attributes: { exclude: ['senha'] } });
            if (!policial) return httpHelper.notFound("Não foi encontrado nenhum policial.");
            return httpHelper.ok(policial);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        console.log(request.body)
        try {
            const { id } = request.params;
            const {
                senha,
                nome_completo,
                data_nascimento,
                genero,
                cpf_policial,
                rg_policial,
                naturalidade,
                email,
                celular,
                cep_policial,
                numero_endereco,
                cargo_graduacao,
                data_ingresso_policia,
                unidade_policia,
                jurisdicao,
            } = request.body;

            // Verificar se o parâmetro de ID foi fornecido
            if (!id) {
                return httpHelper.badRequest("Parâmetros inválidos!");
            }
            let newPassword = {}
            if (senha) {
                newPassword.senha = await bcrypt.hash(
                    senha,
                    Number(process.env.SALT))

            }
            // Atualizar o policial no banco de dados
            const [updatedRowCount] = await PolicialModel.update(
                {
                    ...newPassword,
                    nome_completo,
                    data_nascimento,
                    genero,
                    cpf_policial,
                    rg_policial,
                    naturalidade,
                    email,
                    celular,
                    cep_policial,
                    numero_endereco,
                    cargo_graduacao,
                    data_ingresso_policia,
                    unidade_policia,
                    jurisdicao,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            // Verificar se o policial foi encontrada e atualizada com sucesso
            if (updatedRowCount === 0) {
                return httpHelper.notFound("Policial não encontrado!");
            }

            return httpHelper.ok({
                message: "Policial atualizado com sucesso!",
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countPoliciais(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const countpoliciais = await PolicialModel.count({ where: { situacao: "Ativo" } });
            return httpHelper.ok(countpoliciais);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countMilitar(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const militar = await PolicialModel.count({
                where: {
                    jurisdicao: {
                        [Op.like]: 'Militar'
                    },
                    situacao: "Ativo"
                }
            });
            return httpHelper.ok(militar);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async countCivil(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const civil = await PolicialModel.count({
                where: {
                    jurisdicao: {
                        [Op.like]: 'Civil'
                    },
                    situacao: "Ativo"
                }
            });
            return httpHelper.ok(civil);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async deletePolicial(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const policial = await PolicialModel.update({
                situacao: "Inativo",
            }, {
                where: { id: id }
            })
            return httpHelper.ok("Policial desativado com sucesso!");
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { PolicialController };
