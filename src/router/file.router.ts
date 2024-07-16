import {Router} from 'express';
import FileController from '../controller/file.controller';

class FileRouter{
    public router:Router;

    constructor(ExpressRouter : Router){
        this.router = ExpressRouter;
        this.getRouter();
        this.postRouter();
        this.putRouter();
        this.deleteRouter();

    }

    postRouter(){
        this.router.post('/write' , FileController.updateFileContent);
    }

    getRouter(){
       this.router.get('/read' , FileController.displayFileContent)
    }

    putRouter(){

    }

    deleteRouter(){

    }
    
}

export default FileRouter;
