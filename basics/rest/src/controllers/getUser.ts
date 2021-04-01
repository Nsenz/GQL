import {usersDB} from '../data-access';

export function buildGetUser() {
  return async function getUserById({_id}:{_id: string}) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const user = await (await usersDB).findById({_id});
      return {
        headers,
        statusCode: 200,
        body: user
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
