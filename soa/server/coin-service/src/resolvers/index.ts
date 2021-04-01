import {buildCoinResolvers} from './coin';
import mongodb from 'mongodb';

const url="mongodb://127.0.0.1:27017"
const db = "gql-coin";
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

const coinResolvers = makeDB().then(db=>buildCoinResolvers(db));

export {coinResolvers, closeDB};