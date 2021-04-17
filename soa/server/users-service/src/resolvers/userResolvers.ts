import {__environment__, __wrappee__} from '../const';
import axios from 'axios';
import DataLoader from 'dataloader';

type UserInput = {
    username: string,
    password: string,
    role: "USER" | "MODERATOR"
};

export const userResolvers: any = {
    Query: {
        users: async (_:any, __: any, req: any)=>{
            const allUsers = await (await axios.get(`${__wrappee__}/users`, {
                headers: {
                    Authorization: req.user.replace("Bearer ", "")
                }
            })).data.results;
            console.log(`${new Date()} : Fetching users`);
            return allUsers;
        },
        paginatedUsers: async (_:any, {page, limit} : {page:number, limit: number}, req:any)=>{
            const paginatedUsers = await (await axios.get(`${__wrappee__}/users?page=${page}&limit=${limit}`,{
                headers: {
                    Authorization: req.user.replace("Bearer ", "")
                }
            })).data.results;
            console.log(`${new Date()} : Fetching paginated users`);
            return paginatedUsers;
        },
        me: async (_:any, __:any, req:any)=>{
            const me = await axios.get(`${__wrappee__}/me`,{
                headers: {
                    Authorization: req.user.replace("Bearer ", "")
                }
            });
            if(!me) return null;
            console.log(`${new Date()} : Fetching my profile`);
            return me.data;
        }
    },
    User: {
        __resolveReference: async (ref: any, req:any, info:any) => {
            console.log(`${new Date()} : Getting subscribers`);
            const currentUser = await (await axios.get(`${__wrappee__}/user/${ref._id}`, {
                headers: {
                    Authorization: req.user.replace("Bearer ", "")
                }
            })).data;
            return currentUser;
/*             const {dataloaders} = req;
            let loader = dataloaders.get(info.fieldNodes);
            if (!loader) {
                loader = new DataLoader(async (ids: any) => {
                    console.log(`${new Date()} : Getting subscribers`);
                    const users: any = await (await axios.get(`${__wrappee__}/users`,{
                        headers: {
                            Authorization: req.user.replace("Bearer ", "")
                        }
                    })).data;
                    const requestedUsers = ids.map((id: any) => users.results.find((user: { _id: any; }) => user._id === id));
                    return requestedUsers;
                });
                dataloaders.set(info.fieldNodes, loader);
            }
            return loader.load(ref._id) */
        },
    },
    Mutation: {
        register: async (_: any, userInput: UserInput ) => {
            try{
                const castedInput = (userInput as any).userInput;
                const user = {
                    username: castedInput.username,
                    password: castedInput.password,
                    role: castedInput.role || "USER"
                };
                await axios.post(`${__wrappee__}/register`, {...user});
                console.log(`${new Date()} : Registering a new user`);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
        login: async (_:any, {username, password} : {username: string, password: string}) => {
            try{
                const token = await (await axios.post(`${__wrappee__}/login`, {username, password})).headers["authorization"];
                console.log(`${new Date()} : Logging in`);
                return token;
            } catch(err){
                console.log(err);
                return null;
            }
        },
        logout: async (_:any, __:any, req: any)=>{
            try{
                await axios.get(`${__wrappee__}/logout`, {
                    headers: {
                        Authorization: req.user.replace("Bearer ","")
                    }
                });
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        }
    },
}