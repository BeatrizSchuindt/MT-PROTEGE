const { Model, DataTypes } = require("sequelize");

class OcorrenciaModel extends Model {
    static init(database) {
        super.init({
            id_ocorrencia: DataTypes.INTEGER,
            matricula_policial: DataTypes.STRING,
            data_ocorrencia: DataTypes.DATEONLY,
            hora_ocorrencia: DataTypes.TIME,
            cep_ocorrencia: DataTypes.STRING, 
            tipo_ocorrencia: DataTypes.STRING,
            prioridade_ocorrencia: DataTypes.STRING,
            status_ocorrencia: DataTypes.STRING,
            descricao_ocorrencia: DataTypes.TEXT,
            nome_completo_vitima: DataTypes.TEXT,
            cpf_vitima: DataTypes.STRING,
            contato_vitima: DataTypes.STRING,
            nome_completo_suspeito: DataTypes.TEXT,
            cpf_suspeito: DataTypes.STRING,
            caracteristicas_suspeito: DataTypes.TEXT,
            descricao_evidencias: DataTypes.TEXT
        }, {
            tableName: 'ocorrencia',
            modelName: 'OcorrenciaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { OcorrenciaModel };