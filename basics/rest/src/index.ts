import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import {controllers} from './controllers';
import { paginatedResult } from './middlewares/pagination';


const main = async () => {
    const server = express();
    server.use(bodyParser.json());
    server.get('/users', paginatedResult(()=>controllers.getUsers()), async (_, res)=>{
        res.status(200).send((res as any).paginatedResult);
    });
    server.get('/user/:userId', async (req, res) => {
        const _id = req.params.userId as string;
        const result = await controllers.getUserById({_id});
        res.status(result.statusCode).send(result.body);
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