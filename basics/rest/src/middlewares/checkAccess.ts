import { NextFunction, Request, Response } from "express";

type CacheClientAccess = {
    get: (key: string, callback: (err: any, result: any) => void) => boolean;
}

export function checkAccess(cacheClient: CacheClientAccess, decode: (token: string) => string | { [key: string]: any; } | null) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token: string | null = req.header("Authorization") || null;

        if (!token) {
            res.status(403).send({ success: false }).end();
            throw new Error("Access denied");
        };

        const decodedToken = decode((token as string));

        if (!decodedToken) {
            res.status(403).send({ success: false }).end();
            throw new Error("Can't decode the token")
        };

        cacheClient.get(decodedToken!.sub, (_, dbToken) => {
            if (dbToken !== token) {
                res.status(403).send({ success: false }).end();
                throw new Error("Token is invalid");
            }
            next();
        });
    }
}