'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('policial', {
      id_ocorrencia: {
        type: Sequelize.INTEGER,// É INTEGER MESMO?
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      matricula_policial: { //tá certo referenciar assim?
        type: Sequelize.STRING,
        references: {
          model: 'PolicialModel',
          key: 'id'
        }
      },
      data_ocorrencia: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora_ocorrencia: {
        type: Sequelize.TIME,
        allowNull: false
      },
      cep_ocorrencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_ocorrencia: {
        type: Sequelize.STRING,
        allowNull: false
      }, 
      prioridade_ocorrencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status_ocorrencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao_ocorrencia: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nome_completo_vitima: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cpf_vitima: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contato_vitima: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_completo_suspeito: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cpf_suspeito: {
        type: Sequelize.STRING,
        allowNull: false
      },
      caracteristicas_suspeito: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      descricao_evidencias: {
        type: Sequelize.TEXT,
        allowNull: false
      }

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
