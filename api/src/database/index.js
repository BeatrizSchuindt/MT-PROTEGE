const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { OcorrenciaModel } = require('../models/ocorrencia');
const { PolicialModel } = require('../models/policial');

const database = new Sequelize(configDatabase);

OcorrenciaModel.init(database);
PolicialModel.init(database);

module.exports = database;