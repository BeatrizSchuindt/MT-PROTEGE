const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PolicialModel } = require('../models/policial');

class PolicialController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { matricula_policial, senha } = request.body;
            if (!matricula_policial || !senha) return httpHelper.badRequest('Matrícula e senha são obrigatórios!');
            const policialAlreadyExists = await PolicialModel.findOne({ where: { matricula_policial } });
            if (policialAlreadyExists) return httpHelper.badRequest('Matrícula de policial já cadastrado!');
            const senhaHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const policial = await PolicialModel.create({//VER SE EU VOU PRECISAR COLOCAR TODOS OS ITENS DO CADASTRO
                matricula_policial,
                senha: senhaHashed,
            });
            if (!policial) return httpHelper.badRequest('Houve um erro ao criar usuário de policial');
            const accessToken = jwt.sign(//VER ISSO AQUI
                { id: user.id },
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
            if (!matricula_policial || !senha) return httpHelper.badRequest('Matrícula e senha são obrigatórios!');
            const policialExists = await PolicialModel.findOne({ where: { matricula_policial } });
            if (!policialExists) return httpHelper.notFound('Usuário policial não encontrado!');
            const isSenhaValida = await bcrypt.compare(senha, policialExists.senha);
            if (!isSenhaValida) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },//ver se é com matrícula que faz //Ou se crio o usuário do policial com email a parte
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { PolicialController };