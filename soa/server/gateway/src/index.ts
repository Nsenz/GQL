import {ApolloServer} from 'apollo-server';
import {GraphQLResponse} from 'apollo-server-types';
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway';
import { SERVER_ID_HEADER } from './const';

const main = async ()=>{
    const gateway = new ApolloGateway({
        serviceList: [
            {name: 'users', url: 'http://localhost:4002'},
            {name: 'coins', url: 'http://localhost:4003'}
        ],
        buildService({url}){
            return new RemoteGraphQLDataSource({
                url,
                didReceiveResponse({response} : {response: GraphQLResponse}): GraphQLResponse{
                    const serverId = response.http?.headers.get(SERVER_ID_HEADER);
                    console.log(`${new Date()} : Got a response from the server with ${serverId} id`);
                    return response;
                }
            })
        }
    });

    const gatewayServer = new ApolloServer({
        gateway,
        subscriptions: false
    });

    gatewayServer.listen({port: 4001}).then(({ url }) => {
        console.log(`🚀 Gateway ready at ${url}`);
    });
};

main();