import {buildAddUser} from '../usecases';
import {User} from '../usecases';
import {Db} from 'mongodb';

export function buildUsersDb(dbClient: Db){
    return Object.freeze({
        findAll,
        insertOne
    });
    async function findAll(){
        try{
            const users: any[] = [];
            await dbClient.collection('users').find().forEach(doc => users.push(doc));
            return users;
        } catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
    async function insertOne({userInfo} : {userInfo: User}) {
        try{
            const addUser = buildAddUser(dbClient.collection('users'));
            await addUser(userInfo);
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
}