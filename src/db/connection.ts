import { Sequelize, Dialect  } from 'sequelize'
import { environments } from '../config/environments'


export const sequelize = new Sequelize(
    environments.DB_NAME,
    environments.DB_USER,
    environments.DB_PASSWORD,
    {
        host: environments.DB_HOST,
        dialect: environments.DB_DIALECT as Dialect, // Aquí usamos type assertion,
        port: typeof environments.DB_PORT === 'string' ? parseInt(environments.DB_PORT, 10) : environments.DB_PORT
    }
)

// Conexión a la base de datos
export async function startDb() {
    try {
        await sequelize.sync({ force: false })
        console.log('Base de datos conectada')
    } catch (error) {
        console.log('Error al intentar conectar la base de datos', error)
    }
}