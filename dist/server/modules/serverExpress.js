"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const user_model_1 = __importDefault(require("../DB/models/user.model"));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    return res.status(200).send('Welcome');
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Informações faltando' });
        }
        const userExists = yield user_model_1.default.findOne({ $or: [{ username, email }] });
        if (userExists) {
            return res.status(400).json({ message: 'Este email ou o username já está foram pegos!' });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield user_model_1.default.create({
            username,
            email,
            password: hashedPassword
        });
        const token = yield jwt.sign({ id: user._id, username: user.username }, process.env.REGISTER_USER_SECET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ user, token });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
        else {
            console.error(err);
            res.status(500).json({ message: 'Erro ao registrar o usuario' });
        }
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user)
            return res.status(404).json({ message: 'usuario não encontrado' });
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(404).json({ message: 'senha incorreta' });
        const token = yield jwt.sign({ id: user._id, username: user.username }, process.env.LOGIN_USER_SECET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        else {
            console.error(err);
            return res.status(500).json({ message: 'Erro Tentar Logar' });
        }
    }
}));
app.listen(8080, () => console.log('app running on port 8080'));
