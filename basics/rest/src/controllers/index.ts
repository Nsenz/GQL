import {buildGetUsers} from './getUsers';
import {buildPostUser} from './postUser';
import {v4} from 'uuid';

const getUsers = buildGetUsers();
const postUser = buildPostUser(v4);

export const controllers = Object.freeze({
    getUsers,
    postUser
});