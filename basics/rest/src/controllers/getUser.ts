import {usersDB} from '../data-access';

export function buildGetUser() {
  return async function getUserById({_id, httpResponse}:{_id: string, httpResponse?: any}) {
    try {
      const user = await (await usersDB).findById({_id});
      if(httpResponse){
        if(user) httpResponse.status(200).send(user).end();
        else httpResponse.status(500).send({success: false}).end(); 
      } else {
        return user;
      }
    } catch (e) {
      console.log(`${new Date()} : An error when getting users has occured`);
      httpResponse.status(500).send({success:false}).end();
      throw new Error(e);
    }
  }
}
