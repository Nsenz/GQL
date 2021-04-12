import { usersDB } from '../data-access';

export function buildPostUser(uuid: () => string, hash: (password: string)=>Promise<string>) {
    return async function postUser(httpRequest: any, httpResponse: any) {
        try {
            const { source = {}, username, password, role } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.headers['User-Agent']
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            await (await usersDB).insertOne({
                userInfo:{
                    _id: uuid(),
                    username,
                    role,
                    password: await hash(password),
                }
            });
            httpResponse.status(201).send({success: true}).end();
        } catch (err) {
            console.log(err);
            httpResponse.status(400).send({error: err.message}).end();
        }
    }
}