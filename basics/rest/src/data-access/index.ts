import {buildUsersDb} from './users-db';
import mongodb from 'mongodb';

const url = process.env.URL;
const db = process.env.DB;
const mongoClient: mongodb.MongoClient = new mongodb.MongoClient(url!, { useNewUrlParser: true });

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

const usersDB = makeDB().then(db=>buildUsersDb(db));

export {usersDB, closeDB};