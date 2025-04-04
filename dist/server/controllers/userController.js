import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../DB/models/user.model';
import { addToTokenBlacklist } from '../middlewares/tokenBlacklistMiddleware';
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Missing information' });
            return;
        }
        const usernameTaken = await userModel.findOne({ username });
        const emailTaken = await userModel.findOne({ email });
        if (usernameTaken || emailTaken) {
            res.status(400).json({ message: 'Email or username already taken' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.REGISTER_USER_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.LOGIN_USER_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
};
export const logoutUser = (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(400).json({ message: 'Token is required' });
        return;
    }
    addToTokenBlacklist(token);
    res.status(200).json({ message: 'Logged out successfully' });
};
