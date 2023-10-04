const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { PolicialModel } = require('../models/policial');
const { OcorrenciaModel } = require('../models/ocorrencia');

const database = new Sequelize(configDatabase);

PolicialModel.init(database);
OcorrenciaModel.init(database);

PolicialModel.associate(database.models);
OcorrenciaModel.associate(database.models);

module.exports = database;