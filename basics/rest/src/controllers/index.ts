import {buildGetUsers} from './getUsers';
import {buildPostUser} from './postUser';
import {v4} from 'uuid';
import { buildGetUser } from './getUser';

const getUsers = buildGetUsers();
const getUserById = buildGetUser();
const postUser = buildPostUser(v4);

export const controllers = Object.freeze({
    getUsers,
    getUserById,
    postUser
});