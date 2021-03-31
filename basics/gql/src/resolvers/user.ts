import {Db, ObjectId} from 'mongodb';
import {customDateScalar} from '../schemas';

export function buildUserResolvers(dbClient: Db){
    return Object.freeze({
        Query: {
            users: async ()=>{
                const users: any[] = [];
                await dbClient.collection('users').find().forEach(user => users.push(user));
                return users;
            },
            user: async (_: any, {_id} : {_id: string})=>{
                const user = await dbClient.collection('users').findOne({_id: new ObjectId(_id)});
                return user;
            }
        },
        Mutation: {
            createUser: async (_:any, { username, password, role } : {username: string, password: string, role: string}) => {
                try{
                    const exists = await dbClient.collection('users').findOne({username: username.toLowerCase()});
                    if(exists) return false;
                    await dbClient.collection('users').insertOne({username: username.toLowerCase(), password, role, createdAt: new Date(), leisure: []});
                    return true;
                }catch(err){
                    return false;
                }
            },
            addMovieLeisure: async (_:any, {leisureInput: {id, name}, duration}: any) => {
                const user = await dbClient.collection('users').findOne({_id: new ObjectId(id)});
                if(user){
                    const leisure = user.leisure;
                    leisure.push({
                        name,
                        duration
                    });
                    await dbClient.collection('users').updateOne({_id: new ObjectId(id)}, {$set: {
                        leisure: leisure
                    }});
                    return true;
                }
                return false;
            },
            addMagazineLeisure: async (_:any, {leisureInput: {id, name}}: any) => {
                const user = await dbClient.collection('users').findOne({_id: new ObjectId(id)});
                if(user){
                    const leisure = user.leisure;
                    leisure.push({
                        name
                    });
                    await dbClient.collection('users').updateOne({_id: new ObjectId(id)}, {$set: {
                        leisure: leisure
                    }});
                    return true;
                }
                return false;
            }
        },
        Leisure: {
            __resolveType(obj: any) {
                if (obj.duration) {
                    return 'Movie';
                }
                return 'Magazine';
            },
        },
        Date: customDateScalar
    });
}