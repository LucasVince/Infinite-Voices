const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
import userModel from '../DB/models/user.model';

app.use(express.json());
app.use(cors());

const tokenBlacklist = new Set();

app.get('/', (req: any, res: any) => {
    return res.status(200).send('Welcome');
});

app.post('/register', async (req:any, res:any) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Informações faltando'});
        }

        const userExists = await userModel.findOne({ $or: [{ username, email}] });

        if(userExists) {
            return res.status(400).json({ message: 'Este email ou o username já está foram pegos!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });
        
        const token = await jwt.sign({id: user._id, username: user.username}, process.env.REGISTER_USER_SECET_KEY as string, {expiresIn: '1h'});
        return res.status(200).json({user, token});
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            res.status(500).json({ message: err.message });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Erro ao registrar o usuario'});
        }
    }
});


app.post('/login', async(req:any, res:any)=> {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email});
        if (!user) return res.status(404).json({message:'usuario não encontrado'})
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(404).json({ message:'senha incorreta' })

        const token = await jwt.sign({id: user._id, username: user.username}, process.env.LOGIN_USER_SECET_KEY as string, {expiresIn: '1h'});

        return res.status(200).json({ token });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Erro Tentar Logar'});
        }
    }
});

app.post('/logout', (req: any, res: any) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        jwt.verify(token, process.env.LOGIN_USER_SECET_KEY as string, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            tokenBlacklist.add(token);
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
        }
    }
});

app.use((req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
    next();
});

app.listen(8080, () => console.log('app running on port 8080'));