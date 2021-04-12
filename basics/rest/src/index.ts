import express from 'express';
import cluster from 'cluster';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import useragent from 'express-useragent';
dotenv.config();

import { buildControllers } from './controllers';
import { paginatedResult } from './middlewares/pagination';
import { checkAccess } from './middlewares/checkAccess';

const main = async () => {
    if (cluster.isMaster) {
        cluster.fork();
        cluster.fork();
        cluster.fork();
        cluster.fork();

        cluster.on('exit', () => {
            console.error(`${new Date()} : A process has died .... restarting .....`);
            cluster.fork();
        });
    } else {
        const redisClient = redis.createClient();
        const accessMiddleware = checkAccess(redisClient, jwt.decode);
        const usersPaginationMiddleware = paginatedResult(() => controllers.getUsers());
        const controllers = buildControllers({
            uuid: v4, cacheClient: redisClient, decode: jwt.decode,
            hash: argon2.hash, verify: argon2.verify, signJWT: jwt.sign
        });
        const server = express();
        server.use(bodyParser.json());
        server.use(useragent.express());
        server.get('/users', [accessMiddleware,usersPaginationMiddleware],
         async (_: any, res: any) => {
            res.status(200).send((res as any).paginatedResult);
        });
        server.get('/user/:id', accessMiddleware, controllers.getUserById);
        server.post('/register', controllers.postUser);
        server.post('/login', controllers.loginUser);
        server.get('/me', accessMiddleware, async (req, res) => {
            const userId = jwt.decode(req.headers.authorization!)?.sub as string;
            req.params.id = userId;
            await controllers.getUserById(req, res);
        });
        server.get('/logout', controllers.logoutUser);
        server.listen(3000, () => {
            console.log("The server is up on port 3000");
        });
    }
};

main();