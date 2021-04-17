import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import cluster from 'cluster';
import { coinType } from './graphql';
import { coinResolvers } from './resolvers';

const main = async () => {
    const res = await coinResolvers;
    const server = new ApolloServer({
        schema: buildFederatedSchema([{typeDefs: coinType, resolvers: res}]),
        playground: false,
        context: ({req, res})=>{
            const user = req.headers.user;
            res.setHeader('server-id', 'coins-service');
            return {user};
        }
    });
    if(cluster.isMaster){
        cluster.fork();
        cluster.fork();

        cluster.on('exit', ()=>{
            console.log(`${new Date()} : A process has died...restarting`);

            cluster.fork();
        });
    } else {
        server.listen({port: 4003}).then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    }
};

main();
