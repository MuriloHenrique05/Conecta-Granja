import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Avaliacao from "./Avaliacao.js";


const Categoria = database.define("Categoria", 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descritivo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
);

Categoria.hasMany(Avaliacao, {
    foreignKey: "categoria_id"
});

Avaliacao.belongsTo(Categoria, {
    foreignKey: "categoria_id"
});

export default Categoria;