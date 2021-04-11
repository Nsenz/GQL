import {buildAddUser} from '../usecases';
import {User} from '../usecases';
import {Db} from 'mongodb';

export function buildUsersDb(dbClient: Db){
    return Object.freeze({
        findAll,
        findById,
        insertOne,
        findByUsername
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
    };
    async function findById({_id}:{_id:string}){
        try{
            const user = await dbClient.collection('users').findOne({_id: _id});
            return user;
        } catch(err){
            console.log(err);
            throw new Error(err);
        }
    };
    async function insertOne({userInfo} : {userInfo: User}) {
        try{
            const addUser = buildAddUser(dbClient.collection('users'));
            await addUser(userInfo);
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    };
    async function findByUsername(username: string){
        try{
            const user = await dbClient.collection('users').findOne({username: username});
            if(user) return user;
            return null;
        } catch (err){
            console.log(err);
            throw new Error(err);
        }
    }
}