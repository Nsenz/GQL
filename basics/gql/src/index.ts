import { ApolloServer } from 'apollo-server';
import { userType } from './schemas';
import { userResolvers } from './resolvers';
import dotenv from 'dotenv';
dotenv.config();


const main = async () => {
    const resolvers = await userResolvers;
    const server = new ApolloServer({
        playground: true,
        introspection: true,
        typeDefs: [userType],
        resolvers: [resolvers],
    });
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};


main();
