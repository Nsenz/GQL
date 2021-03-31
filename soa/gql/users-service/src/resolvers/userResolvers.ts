import {__environment__} from '../const';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type UserInput = {
    firstName: string,
    lastName: string,
    password: string
};

export const userResolvers: any = {
    Query: {
        users: async ()=>{
            const allUsers = await prisma.user.findMany();
            return allUsers;
        }
    },
    User: {
        __resolveReference: async (ref: any) => {
            const currentUser = await prisma.user.findUnique({where:{id: ref.id}});
            return currentUser;
        },
    },
    Mutation: {
        createUser: async (_: any, userInput: UserInput ) => {
            try{
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
    },
}