import {NextFunction, request, response} from 'express';

export const validateUser =(schema : any) => (req = request, res = response, next : NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: JSON.parse(error.message).map((err: any) => err.message)
            });
        }
        return res.status(400).json({
            error: "Error unknown",
        });
    }
}