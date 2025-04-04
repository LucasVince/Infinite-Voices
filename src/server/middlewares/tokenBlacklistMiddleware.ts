import { Request, Response, NextFunction } from 'express';

const tokenBlacklist = new Set();

export const tokenBlacklistMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        res.status(401).json({ message: 'Token is blacklisted' });
        return;
    }
    next(); // Continue to the next middleware or route handler
};

export const addToTokenBlacklist = (token: string): void => {
    tokenBlacklist.add(token);
};