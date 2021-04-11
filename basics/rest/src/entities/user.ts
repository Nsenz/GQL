export enum ROLE{
  USER,
  ADMIN,
  MODERATOR
};

export function buildCreateUser () {
  return function createUser ({
      _id,
      username,
      password,
      role,
      createdAt = new Date()
  }: {_id: string, username: string, password: string, role: ROLE, createdAt?: Date}) {
    if(!role || !(role in ROLE)){
      throw new Error("User must have a valid role");
    }
    if (!username || username.length < 4) {
      throw new Error('User must have a valid username');
    }
    if (!password || password.length < 6) {
      throw new Error('User must have a valid password');
    }
    if(!_id){
      throw new Error('User must have a valid id');
    }
    return Object.freeze({
        getId: ()=>_id,
        getUsername: ()=>username,
        getPassword: ()=>password,
        getRole: ()=>role,
        getCreatedAt: ()=>createdAt
    });
  }
};