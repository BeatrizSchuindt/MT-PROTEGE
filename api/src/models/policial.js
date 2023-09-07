const { Model, DataTypes } = require("sequelize");

class PolicialModel extends Model {
    static init(database) {
        super.init({
            matricula_policial: DataTypes.STRING,
            senha: DataTypes.STRING,
            nome_completo: DataTypes.TEXT, 
            data_nascimento: DataTypes.DATEONLY,
            genero: DataTypes.STRING,
            cpf_policial: DataTypes.STRING,
            rg_policial: DataTypes.STRING,
            naturalidade: DataTypes.STRING,
            email: DataTypes.TEXT,
            celular: DataTypes.STRING,
            cep_policial: DataTypes.STRING,
            numero_endereco: DataTypes.STRING,
            cargo_graduacao: DataTypes.TEXT,
            data_ingresso_policia: DataTypes.DATEONLY,
            unidade_policia: DataTypes.TEXT,
            jurisdicao: DataTypes.STRING,
        }, {
            tableName: 'policial',
            modelName: 'PolicialModel',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { PolicialModel };