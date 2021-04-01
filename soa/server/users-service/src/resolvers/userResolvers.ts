import {__environment__, __wrappee__} from '../const';
import axios from 'axios';

type UserInput = {
    username: string,
    password: string
};

export const userResolvers: any = {
    Query: {
        users: async ()=>{
            const allUsers = await (await axios.get(`${__wrappee__}/users`)).data.results;
            return allUsers;
        },
        paginatedUsers: async (_:any, {page, limit} : {page:number, limit: number})=>{
            const paginatedUsers = await (await axios.get(`${__wrappee__}/users?page=${page}&limit=${limit}`)).data.results;
            return paginatedUsers;
        }
    },
    User: {
        __resolveReference: async (ref: any) => {
            const currentUser = await (await axios.get(`${__wrappee__}/user/${ref._id}`)).data;
            return currentUser;
        },
    },
    Mutation: {
        createUser: async (_: any, userInput: UserInput ) => {
            try{
                const user = {
                    username: userInput.username || `unknown-user-${new Date().getSeconds() * Math.random()}`,
                    password: userInput.password || 'default-password'
                };
                await axios.post(`${__wrappee__}/user`, {...user});
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
    },
}