import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import path from 'path';

export function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const publicKey = readFileSync(path.join(__dirname, '/../../public.pem'), {
        encoding: 'utf8'
    });

    jwt.verify(token.replace('Bearer ', ''), publicKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: error.message });
        } else {
            req.requestUser = {};
            logger.info(decoded);
        }
    });

    next();
}
