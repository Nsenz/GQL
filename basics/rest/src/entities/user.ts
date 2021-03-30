export function buildCreateUser () {
  return function createUser ({
      _id,
      username,
      password,
      blockchain,
      createdAt = new Date()
  }: {_id: string, username: string, password: string, blockchain: string, createdAt?: Date}) {
    if (!username || username.length < 4) {
      throw new Error('User must have a valid username');
    }
    if (!password || password.length < 6) {
      throw new Error('User must have a valid password');
    }
    if(!blockchain){
      throw new Error('User must have a valid blockchain');
    }
    if(!_id){
      throw new Error('User must have a valid id');
    }
    return Object.freeze({
        getId: ()=>_id,
        getUsername: ()=>username,
        getPassword: ()=>password,
        getBlockchain: ()=>blockchain,
        getCreatedAt: ()=>createdAt
    });
  }
};