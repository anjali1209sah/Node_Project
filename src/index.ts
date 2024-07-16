import { Request, Response } from 'express';
import {Server} from './server'; 
let server = new Server();
let port = server.port; 
let app = server.app; 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

