import {buildUserResolvers} from './user';
import mongodb from 'mongodb';

const url="mongodb://127.0.0.1:27017"
const db = "gql";
const mongoClient: mongodb.MongoClient = new mongodb.MongoClient(url, { useNewUrlParser: true });

async function makeDB(){
    if(!mongoClient.isConnected()){
        await mongoClient.connect();
    }
    return mongoClient.db(db);
}

async function closeDB(){
    if(mongoClient.isConnected()){
        await mongoClient.close();
    }
}

const userResolvers = makeDB().then(db=>buildUserResolvers(db));

export {userResolvers, closeDB};