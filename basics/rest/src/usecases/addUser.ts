import {buildCreateUser} from '../entities';
import {Collection} from 'mongodb';
import { ROLE } from '../entities/user';

export type User = {
    _id: string,
    username: string,
    role: ROLE,
    password: string,
    createdAt?: Date
};

export function buildAddUser(userCollection: Collection<User>){
    return async function addUser(userInfo: User){
        const exists = await userCollection.findOne({_id: userInfo._id});
        const sameName = await userCollection.findOne({username: userInfo.username.toLowerCase()});
        if (exists || sameName){
            throw new Error(`${new Date()} : Something went wrong when creating a new user`);
        }
        try{
            const createUser = buildCreateUser();
            const newUser = createUser(
                {
                    _id: userInfo._id,
                    username: userInfo.username,
                    role: userInfo.role,
                    password: userInfo.password
                }
            );
            await userCollection.insertOne({
                _id: newUser.getId(),
                username: newUser.getUsername().toLowerCase(),
                role: newUser.getRole(),
                password: newUser.getPassword(),
            }).catch(err => {
                throw new Error(err);
            });
            console.log(`${new Date()} : A new user with username ${newUser.getUsername()} has been created`);
        } catch(err){
            throw new Error(err);
        }
    }
}