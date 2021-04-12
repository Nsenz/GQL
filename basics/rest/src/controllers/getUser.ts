import {usersDB} from '../data-access';

export function buildGetUser() {
  return async function getUserById(httpRequest: any, httpResponse: any) {
    try {
      const user = await (await usersDB).findById({_id: httpRequest.params.id});
      if(httpResponse){
        if(user) httpResponse.send(user).end();
        else httpResponse.send({success: false}).end(); 
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
