const tokenBlacklist = new Set();
export const tokenBlacklistMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        res.status(401).json({ message: 'Token is blacklisted' });
        return;
    }
    next(); // Continua para o próximo middleware ou rota
};
export const addToTokenBlacklist = (token) => {
    tokenBlacklist.add(token);
};
