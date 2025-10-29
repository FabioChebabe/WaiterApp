import { verify, JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { NextFunction, Request, Response } from 'express';

export function authenticationMiddleware(
    req: Request,
    resp: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;
    if (!authorization) {
        return resp.status(401).json({ error: 'Invalid access token.' });
    }

    try {
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw new Error();
        }
        const payload = verify(token, env.jwtSecret) as JwtPayload;

        const result = {
            data: {
                account: {
                    id: payload.sub ?? '',
                    role: payload.role,
                    org: payload.org,
                },
            },
        };

        req.metadata = {
            ...req.metadata,
            ...result.data,
        };

        next();
    } catch (error) {
        return resp.status(401).json({
            error: 'Invalid access token.',
        });
    }
}
