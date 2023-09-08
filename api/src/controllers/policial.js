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
            if (policialAlreadyExists)
                return httpHelper.badRequest(
                    "Matrícula de policial já cadastrado!"
                );
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
            if (!policial)
                return httpHelper.notFound("Usuário policial não encontrado!");
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
                order: [["matricula_policial", "ASC"]],
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
                    }
                },
            });

            return httpHelper.ok(policiais);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { PolicialController };
