import jwt from 'jsonwebtoken';
export class AuthController {
    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ message: 'Missing information' });
                return;
            }
            const user = await this.registerUseCase.execute({ username, email, password });
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.REGISTER_USER_SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
