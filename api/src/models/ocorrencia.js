const { Model, DataTypes } = require("sequelize");

class OcorrenciaModel extends Model {
    static init(database) {
        super.init({
            id_ocorrencia: DataTypes.TEXT,
            matricula_policial: DataTypes.TEXT,
            data_ocorrencia: DataTypes.DATEONLY,
            hora_ocorrencia: DataTypes.TIME,
            cep_ocorrencia: DataTypes.TEXT, 
            tipo_ocorrencia: DataTypes.TEXT,
            prioridade_ocorrencia: DataTypes.TEXT,
            status_ocorrencia: DataTypes.TEXT,
            descricao_ocorrencia: DataTypes.TEXT,
            nome_completo_vitima: DataTypes.TEXT,
            cpf_vitima: DataTypes.TEXT,
            contato_vitima: DataTypes.TEXT,
            nome_completo_suspeito: DataTypes.TEXT,
            cpf_suspeito: DataTypes.TEXT,
            caracteristicas_suspeito: DataTypes.TEXT
        }, {
            tableName: 'ocorrencia',
            modelName: 'OcorrenciaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { OcorrenciaModel };