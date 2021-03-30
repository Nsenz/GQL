import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import {controllers} from './controllers';


const main = async () => {
    const server = express();
    server.use(bodyParser.json());
    server.get('/users', async (_, res)=>{
        const users = await controllers.getUsers();
        res.status(users.statusCode).send(users.body);
    });
    server.post('/user', async (req, res) => {
        const result = await controllers.postUser(req);
        res.status(result.statusCode).send(result.body);
    });
    server.listen(3000, ()=>{
        console.log("The server is up on port 3000");
    });
};

main();