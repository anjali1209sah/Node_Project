import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import FileRouter from './router/file.router';

export class Server {
  public app: express.Application = express();
  public port: string | number = 4000;
  public router: express.Router = express.Router();
  constructor() {
    this.setConfigurations();
    this.setCors();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }
  setConfigurations() { 
    this.configureBodyParser(); 
  } 

  configureBodyParser() { 
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 
    this.app.use(bodyParser.json({ limit: '50mb' })); 
  } 

  setCors() { 
    const corsOptions = { 
      origin: "*", 
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'] 
    };
    this.app.use(cors(corsOptions))
  } 

  setRoutes() {
    this.app.use('/file', new FileRouter(this.router).router);
  }

  error404Handler() {
    this.app.use((req :any, res :any) => {
      console.log("route not found ==> " , req.body )
      res.status(404).json({ message: 'Not Found', status_code: 404 });
    })
  }

  handleErrors() {
    this.app.use((error: any, req: any, res: any, next: any) => {
      const errorStatus = error.code;
      console.log("in handle errors - ", error)
      const errResonse = {
        status: error.status, code: errorStatus,
        error: [{ type: error.type, message: error.message }]
      }
      console.log("in handle errors return - ", errResonse)
      res.status(errorStatus).json(errResonse);
    })
  }

}
