import {buildCreateUser} from '../entities';
import {Collection} from 'mongodb';

export type User = {
    _id: string,
    username: string,
    password: string,
    blockchain: string,
    createdAt?: Date
};

export function buildAddUser(userCollection: Collection<User>){
    return async function addUser(userInfo: User){
        const exists = await userCollection.findOne({_id: userInfo._id});
        if (exists){
            throw new Error(`${new Date()} : Something went wrong when creating a new user`);
        }
        try{
            const createUser = buildCreateUser();
            const newUser = createUser(
                {
                    _id: userInfo._id,
                    username: userInfo.username,
                    password: userInfo.password,
                    blockchain: userInfo.blockchain
                }
            );
            await userCollection.insertOne({
                _id: newUser.getId(),
                username: newUser.getUsername(),
                password: newUser.getPassword(),
                blockchain: newUser.getBlockchain()
            }).catch(err => {
                throw new Error(err);
            });
            console.log(`${new Date()} : A new user with username ${newUser.getUsername()} has been created`);
        } catch(err){
            throw new Error(err);
        }
    }
}