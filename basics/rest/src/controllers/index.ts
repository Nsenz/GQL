import {buildGetUsers} from './getUsers';
import {buildPostUser} from './postUser';
import {buildLoginUser, CacheClientLogin, JWTSecret} from './loginUser';
import {buildLogoutUser, CacheClientLogout} from './logoutUser';
import { buildGetUser } from './getUser';

type ControllersDependencies = {
    uuid: () => string;
    hash: (password: string)=>Promise<string>;
    verify: (hash: string, plain: string)=>Promise<Boolean>;
    signJWT: (payload: string | object, secretOrPrivateKey: JWTSecret, options: any | undefined)=>string,
    cacheClient: CacheClientLogin & CacheClientLogout;
    decode: (token: string) => string | { [key: string]: any; } | null;
}

export function buildControllers(dependencies: ControllersDependencies){
    const getUsers = buildGetUsers();
    const getUserById = buildGetUser();
    const postUser = buildPostUser(dependencies.uuid, dependencies.hash);
    const loginUser = buildLoginUser(dependencies.verify, dependencies.signJWT, dependencies.cacheClient);
    const logoutUser = buildLogoutUser(dependencies.cacheClient);
    return Object.freeze({
        getUsers,
        getUserById,
        postUser,
        loginUser,
        logoutUser
    });
};