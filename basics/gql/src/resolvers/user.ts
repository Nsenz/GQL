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
            paginatedUsers: async (_: any, {first, after} : {first: number, after: string})=>{
                if (first < 0) {
                    throw new Error('Invalid number of first elements');
                }
                if (after) {
                    const users = {
                        users: [] as any[],
                        pageInfo: {}
                    };
                    const cursor = dbClient.collection('users').find({_id: {
                        $gt: new ObjectId(after)
                    }});
                    const collectionLength = await cursor.count();
                    if(collectionLength <= first){
                        await cursor.limit(collectionLength).forEach(user => {
                            users.users.push(user);
                        });
                        users.pageInfo = {
                            endCursor: null,
                            hasNextPage: false
                        };
                    } else {
                        await cursor.limit(first).forEach(user => {
                            users.users.push(user);
                        });
                        users.pageInfo = {
                            endCursor: users.users[first-1]._id,
                            hasNextPage: true
                        };
                    };
                    return users;
                } else throw new Error('Paginated request must have "after" parameter');
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
            addMovieLeisure: async (_:any, {leisureInput: {id, name}, runningTime}: any) => {
                const user = await dbClient.collection('users').findOne({_id: new ObjectId(id)});
                if(user){
                    const leisure = user.leisure;
                    leisure.push({
                        name,
                        runningTime
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
                if (obj.runningTime) {
                    return 'Movie';
                }
                return 'Magazine';
            },
        },
        Date: customDateScalar
    });
}