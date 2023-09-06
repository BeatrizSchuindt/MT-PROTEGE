const { Model, DataTypes } = require("sequelize");

class EvidenciaModel extends Model {
    static init(database) {
        super.init({
            id_evidencia: DataTypes.TEXT,
            tipo_evidencia: DataTypes.TEXT,
            descricao_evidencia: DataTypes.TEXT,
            id_ocorrencia: DataTypes.TEXT
        }, {
            tableName: 'evidencia',
            modelName: 'EvidenciaModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { EvidenciaModel };