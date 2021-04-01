import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { coinType } from './graphql';
import { coinResolvers } from './resolvers';

const main = async () => {
    const res = await coinResolvers;
    const server = new ApolloServer({
        schema: buildFederatedSchema([{typeDefs: coinType, resolvers: res}]),
        playground: false,
        context: ({res})=>{
            res.setHeader('server-id', 'coins-service')
        }
    });
    server.listen({port: 4003}).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

main();
