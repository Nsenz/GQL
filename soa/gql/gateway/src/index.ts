import {ApolloServer} from 'apollo-server';
import {GraphQLResponse} from 'apollo-server-types';
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway';
import { SERVER_ID_HEADER } from './const';

type ServerFetcherContext = {
    serverIds: string[];
}

const main = async ()=>{
    const gateway = new ApolloGateway({
        serviceList: [
            {name: 'users', url: 'http://localhost:4001'},
        ],
        buildService({url}){
            return new RemoteGraphQLDataSource({
                url,
                didReceiveResponse({response, context} : {response: GraphQLResponse, context: ServerFetcherContext}): GraphQLResponse{
                    const serverId = response.http?.headers.get(SERVER_ID_HEADER);
                    if(serverId) context.serverIds.push(serverId);
                    return response;
                }
            })
        }
    });

    const gatewayServer = new ApolloServer({gateway,
        subscriptions: false,
        context(){
            return {serverIds:[]}
        },
        plugins: [{
            requestDidStart(): any {
                return {
                    willSendResponse({context, response} : {context: ServerFetcherContext, response: GraphQLResponse}){
                        response.http?.headers.set(
                            SERVER_ID_HEADER,
                            context.serverIds.join(',')
                        );
                    }
                }
            }
        }]
    });

    gatewayServer.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
};

main();