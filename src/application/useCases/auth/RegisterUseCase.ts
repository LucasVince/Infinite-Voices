import userModel from '../../../server/DB/models/user.model'; // Adjusted path
import bcrypt from 'bcrypt';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  async execute(input: RegisterInput) {
    const { username, email, password } = input;

    const usernameTaken = await userModel.findOne({ username });
    const emailTaken = await userModel.findOne({ email });

    if (usernameTaken || emailTaken) {
      throw new Error('Email or username already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hashedPassword });

    return user;
  }
}
