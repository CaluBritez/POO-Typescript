import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/connection";

// Interfaz que define los atributos del modelo Role
interface RoleAttributes {
    role_id: number;
    name: string;
}

// Interfaz que define los atributos opcionales al crear un Role
// En este caso, role_id será opcional porque se autoincrementa
interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id'> {}

// Clase que extiende el Model de Sequelize con las interfaces definidas
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public role_id!: number; // Nota: El '!' indica que será definido
    public name!: string;

    // timestamps: Para compatibilidad con las opciones de Sequelize
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

// Inicialización del modelo
Role.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Instancia de conexión
        tableName: 'roles', // Nombre de la tabla en la base de datos
        timestamps: true, // Añade createdAt y updatedAt
        paranoid: true,   // Añade deletedAt para soft deletes
    }
);

export default Role;
