import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import {userType} from './graphql';
import {userResolvers} from './resolvers';

const server = new ApolloServer({
    schema: buildFederatedSchema([{typeDefs: userType, resolvers: userResolvers}]),
    playground: false,
    context: ({res})=>{
        res.setHeader('server-id', 'users-service');
    }
});

server.listen({port: 4002}).then(()=>{
    console.log(`User service is running on port 4002`);
});


