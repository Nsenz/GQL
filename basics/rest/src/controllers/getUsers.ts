import {usersDB} from '../data-access';

export function buildGetUsers() {
  return async function getUsers() {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const users = await (await usersDB).findAll();
      return {
        headers,
        statusCode: 200,
        body: users
      }
    } catch (e) {
      console.log(`${new Date()} : An error when getting users has occured`);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
