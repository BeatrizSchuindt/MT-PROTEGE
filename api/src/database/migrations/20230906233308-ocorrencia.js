'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ocorrencias', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      matricula_policial: {
        type: Sequelize.STRING,
        references: {
          model: 'policial',
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
    await queryInterface.dropTable('ocorrencias');
  }
};
