import express from 'express'
import router from './router'
import db from './config/db'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { SwaggerUiOptions } from './config/swagger'
import { log } from 'node:console'

//Conectar a base de datos

export async function connectDB() {

    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.white('Conexion existosa a la db'));
        
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white("Hubo un error al conectar la db"));
        
        
    }
    
}

connectDB()

//Instancia de express

const server = express()


//Permitir conexiones

const corsOptions : CorsOptions = {
    origin: function(origin,callback) {
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
            
        }else {
            callback(new Error('Error de CORS'))
        }
        
    }
}

server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json())
//Morgan para loggear & debugear consultar o ver interacciones
server.use(morgan('dev'))

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,SwaggerUiOptions))



export default server