import { Request, Response, NextFunction } from 'express';

export const authorizationMiddleware =
    (allowedRoles: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.metadata?.account?.role;

        if (!userRole) {
            return res
                .status(403)
                .json({ error: 'Access denied: no role found.' });
        }

        if (!allowedRoles.includes(userRole)) {
            return res
                .status(403)
                .json({ error: 'Access denied: insufficient permissions.' });
        }

        next();
    };
