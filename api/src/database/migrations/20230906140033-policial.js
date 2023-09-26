'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('policial', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      matricula_policial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: true
      },
      cpf_policial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rg_policial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      naturalidade: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cep_policial: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numero_endereco: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false
      },
      situacao: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Ativo"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('policial');
  }
};
