export type CacheClientLogout = {
    del: (key: string, callback: (err: any, result:any) => void) => boolean;
    get: (key: string, callback: (err: any, result: any) => void) => boolean;
}

export function buildLogoutUser(cacheClient: CacheClientLogout, decode: (token: string) => string | { [key: string]: any; } | null) {
    return async function logoutUser(httpRequest: any, httpResponse: any) {
        try {
            const authorization: string | null = httpRequest.header("Authorization") || null;
            if (!authorization) throw new Error("No authorization header");
            const decodedToken = decode(authorization);
            if (!decodedToken) throw new Error("Token is invalid");
            cacheClient.get(decodedToken.sub, (_, dbToken) => {
                if (dbToken !== authorization) {
                    httpResponse.status(500).send({ success: false }).end();
                    return;
                };
                cacheClient.del(decodedToken.sub, (err, _) => {
                    if (err) {
                        httpResponse.status(500).send({ success: false }).end();
                        return;
                    };
                });
                console.log(`${new Date()} : A new succeessful logout`);
                httpResponse.status(200).send({ success: true }).end();
            });
        } catch (err) {
            console.log(err);
            httpResponse.status(500).send({ success: false }).end();
            throw new Error(err);
        }
    }
}