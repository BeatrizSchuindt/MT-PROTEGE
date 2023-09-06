'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('policial', {
      matricula_policial: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
      },
      senha: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nome_completo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data_nascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      genero: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cpf_policial: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rg_policial: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      naturalidade: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      celular: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cep_policial: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      numero_endereco: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cargo_graduacao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_ingresso_policia: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      unidade_policia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      jurisdicao: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('policial');
  }
};
