const { Router} = require('express');
const router = Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import userModel from '../DB/models/user.model';

router.post('/register', async (req:any, res:any) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(404).json({message: 'Informações faltando'});
        }

        const userExists = await userModel.findOne({ $or: [{ username, email}]});

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


router.post('/login', async(req:any, res:any)=> {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({message:'usuario não encontrado'})
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(404).json({ message:'senha incorreta' })

        const token = await jwt.sign({id: user._id, username: user.username}, process.env.LOGIN_USER_SECET_KEY as string, {expiresIn: '1h'});
        res.json({ token });
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