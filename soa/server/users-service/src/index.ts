import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import cluster from 'cluster';
import {userType} from './graphql';
import {userResolvers} from './resolvers';

const main = async ()=>{
    const server = new ApolloServer({
        schema: buildFederatedSchema([{typeDefs: userType, resolvers: userResolvers}]),
        context: ({req, res})=>{
            const user = req.headers.user;
            const dataloaders = new WeakMap();
            res.setHeader('server-id', 'users-service');
            return {user, dataloaders};
        }
    });
    if(cluster.isMaster){
        cluster.fork();
        cluster.fork();
        cluster.fork();
        cluster.fork();
    
        cluster.on('exit', ()=>{
            console.log(`${new Date()} : A process has died...restarting`);
            cluster.fork();
        });
    }else{
        server.listen({port: 4002}).then(()=>{
            console.log(`User service is running on port 4002`);
        });
    }
};

main();



