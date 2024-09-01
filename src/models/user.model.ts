import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/connection";
import Role from "./rol.model";

// Definir la interfaz de los atributos del modelo
interface UserAttributes {
    user_id: number;
    username: string;
    password: string;
    email: string;
    role_id: number;
}

// Definir una interfaz para los atributos opcionales (si usas creación parcial)
interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

// Extender la clase Model de Sequelize con tus interfaces
class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public role_id!: number;
}

// Definir el modelo
UserModel.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: Role.primaryKeyAttribute
            },
        },
    },
    {
        sequelize, // Instancia de conexión
        timestamps: false,
        tableName: 'usuarios'
    }
);

export default UserModel;
