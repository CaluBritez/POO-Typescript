import express, { Application } from "express";
import cors from 'cors'
import morgan from "morgan";
import { environments } from './config/environments';
import {router} from './routes/routes';
import {startDb} from "./db/connection";

class Server {

    private app: Application;
    private port: number | string;
    constructor() {
        this.app = express();
        this.port = environments.PORT;

        this.dbConnect();

        this.middlewares();
        this.routes();
    }
    
    private async dbConnect(){
        await startDb()
    }
    

    private middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private routes(){
        this.app.use(router)
    }

    public listen(){
        this.app.listen(this.port, () => console.log(`Server on http://127.0.0.1:${this.port}`))
    }
}

export default Server;