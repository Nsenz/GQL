export type CacheClientLogout = {
    del: (key: string, callback: (err: any, result:any) => void) => boolean;
}

export function buildLogoutUser(cacheClient: CacheClientLogout) {
    return async function logoutUser(httpRequest: any, httpResponse: any) {
        try {
            const userId = httpRequest.userId;
            cacheClient.del(userId, (err, _) => {
                if (err) {
                    httpResponse.status(500).send({ success: false }).end();
                    return;
                };
            });
            console.log(`${new Date()} : A new succeessful logout`);
            httpResponse.status(200).send({success: true}).end();
        } catch (err) {
            console.log(err);
            httpResponse.status(500).send({ success: false }).end();
            throw new Error(err);
        }
    }
}