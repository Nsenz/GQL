import {GraphQLResponse} from 'apollo-server-types';
import {ApolloGateway, RemoteGraphQLDataSource} from '@apollo/gateway';
import {ApolloServer} from 'apollo-server';
import cluster from 'cluster';
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
                didReceiveResponse({response}): GraphQLResponse{
                    const serverId = response.http?.headers.get(SERVER_ID_HEADER);
                    console.log(`${new Date()} : Got a response from the server with ${serverId} id`);
                    return response;
                },
                willSendRequest({ request, context } : {request: any, context: any}) {
                    request.http.headers.set(
                        "user",
                        context.user || null
                    );
                }
            })
        }
    });
    
    const server = new ApolloServer({
        gateway,
        subscriptions: false,
        playground: true,
        context: ({req}) => {
            const user = req.headers.authorization;
            return {user};
        }
    });

    if(cluster.isMaster){
        cluster.fork();
        cluster.fork();
        cluster.fork();
        cluster.fork();

        cluster.on('exit', ()=>{
            cluster.fork();
        });
    } else {
        server.listen({port: 4001}, ()=> {
            console.log(`🚀 Gateway ready on port 4001`);
        });
    }
};

main();