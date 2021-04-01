import {Request, Response, NextFunction} from 'express';

export function paginatedResult(modelGetFunction: () => Promise<{
    headers: {
        'Content-Type': string;
    };
    statusCode: number;
    body: any[];
} | {
    headers: {
        'Content-Type': string;
    };
    statusCode: number;
    body: {
        error: any;
    };
}>){
    return async (req: Request, res: Response, next: NextFunction) => {
        const model = await modelGetFunction();
        if(model.statusCode > 299){
            throw new Error("Error in paginated result");
        }
        let page = parseInt(req.query.page as string);
        let limit = parseInt(req.query.limit as string);
        if(page <= 0 || limit <= 0) throw new Error(`Invalid query parameters`);
        const results = {
            next: {},
            previous: {},
            results: {}
        };
        if(page && limit){
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;
            if (endIndex < (model.body as any[]).length) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            };
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            };
            results.results = (model.body as any[]).slice(startIndex, endIndex);
        } else {
            results.results = model.body as any[];
        }
        (res as any).paginatedResult = results;
        next();
    }
}