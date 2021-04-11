import { Response } from "express";
import { usersDB } from "../data-access";

export type JWTSecret = {
    key: string | Buffer;
    passphrase: string;
} | string;

export type CacheClientLogin = {
    set: (key: string, value: string, callback: (err: any, result:any) => void) => boolean;
    get: (key: string, callback: (err: any, result:any) => void) => boolean;
}

export function buildLoginUser(verify: (hash: string, plain: string)=>Promise<Boolean>,
    signJWT: (payload: string | object, secretOrPrivateKey: JWTSecret, options: any | undefined)=>string,
    cacheClient: CacheClientLogin){
    return async function loginUser(httpRequest: any, httpResponse: Response){
        try {
            const { source = {}, username, password } = httpRequest.body
            source.ip = httpRequest.ip
            source.browser = httpRequest.useragent;
            if (httpRequest.headers['Referer']) {
                source.referrer = httpRequest.headers['Referer']
            }
            const user = await (await usersDB).findByUsername(username);
            if(user && await verify(user.password, password)){
                const userId = String(user._id);
                const jwtToken = signJWT(
                    {role: user.role},
                    "supersecret",
                    { algorithm: "HS256", subject: userId }
                );
                cacheClient.set(userId, jwtToken, (err, _) =>{
                    if(err) throw new Error(err);
                });
                console.log(`${new Date()} : A new successful login`);
                httpResponse.setHeader("Authorization", jwtToken);
                httpResponse.status(200).send({success: true}).end();
            } else {
                httpResponse.status(500).send({success: false}).end();
            }
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}