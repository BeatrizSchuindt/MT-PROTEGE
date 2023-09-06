const { Model, DataTypes } = require("sequelize");

class PolicialModel extends Model {
    static init(database) {
        super.init({
            matricula_policial: DataTypes.TEXT,
            senha: DataTypes.TEXT,
            nome_completo: DataTypes.TEXT, 
            data_nascimento: DataTypes.DATEONLY,
            genero: DataTypes.TEXT,
            cpf_policial: DataTypes.TEXT,
            rg_policial: DataTypes.TEXT,
            naturalidade: DataTypes.TEXT,
            email: DataTypes.TEXT,
            celular: DataTypes.TEXT,
            cep_policial: DataTypes.TEXT,
            numero_endereco: DataTypes.TEXT,
            cargo_graduacao: DataTypes.TEXT,
            data_ingresso_policia: DataTypes.DATEONLY,
            unidade_policia: DataTypes.TEXT,
            jurisdicao: DataTypes.TEXT,
        }, {
            tableName: 'policial',
            modelName: 'PolicialModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { PolicialModel };