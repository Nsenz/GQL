import { usersDB } from '../data-access';

export function buildPostUser(uuid: () => string, hash: (password: string)=>Promise<string>) {
    return async function postUser(httpRequest: any) {
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
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString()
                },
                statusCode: 201,
                body: { success: true }
            }
        } catch (err) {
            console.log(err);
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 400,
                body: err.message
            }
        }
    }
}