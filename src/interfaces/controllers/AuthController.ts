import { Request, Response } from 'express';
import { RegisterUseCase } from '@application/useCases/auth/RegisterUseCase';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: 'Missing information' });
        return;
      }

      const user = await this.registerUseCase.execute({ username, email, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.REGISTER_USER_SECRET_KEY as string,
        { expiresIn: '1h' }
      );

      res.status(200).json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
