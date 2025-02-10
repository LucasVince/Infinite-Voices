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
const post_model_1 = __importDefault(require("../DB/models/post.model"));
app.use(express.json());
app.use(cors());
const tokenBlacklist = new Set();
app.get('/', (req, res) => {
    return res.status(200).send('Welcome');
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Informações faltando' });
        }
        const usernameTaken = yield user_model_1.default.findOne({ username });
        const emailTaken = yield user_model_1.default.findOne({ email });
        if (usernameTaken || emailTaken) {
            return res.status(400).json({ message: 'Este email ou o username já está foram pegos!' });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield user_model_1.default.create({
            username,
            email,
            password: hashedPassword
        });
        const token = yield jwt.sign({ id: user._id, username: user.username }, process.env.REGISTER_USER_SECET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, user });
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
        return res.status(200).json({ token, user });
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
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.headers.page;
    if (page == 'profile') {
        const id = req.query.userID;
        try {
            const user = yield user_model_1.default.findById(id);
            return res.status(200).json({ user });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no serviidor, tente denovo mais tarde' });
            }
        }
    }
}));
app.put('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.headers.page;
    if (page == 'profile') {
        try {
            const { username, bio, status, temporaryMessage, userID } = req.body;
            if (!userID) {
                return res.status(400).json({ message: 'userID is required' });
            }
            const usernameAlreadyTaken = yield user_model_1.default.findOne({ username: username });
            if (usernameAlreadyTaken && usernameAlreadyTaken._id != userID) {
                return res.status(400).json({ message: 'username already taken, please, choose other' });
            }
            if (username != '') {
                yield user_model_1.default.findByIdAndUpdate(userID, {
                    username: username
                }, {
                    new: true,
                    runValidators: true
                });
            }
            if (bio != '') {
                yield user_model_1.default.findByIdAndUpdate(userID, {
                    bio: bio
                }, {
                    new: true,
                    runValidators: true
                });
            }
            if (temporaryMessage != '') {
                yield user_model_1.default.findByIdAndUpdate(userID, {
                    temporaryMessage: temporaryMessage
                }, {
                    new: true,
                    runValidators: true
                });
            }
            if (status != '') {
                yield user_model_1.default.findByIdAndUpdate(userID, {
                    status: status
                }, {
                    new: true,
                    runValidators: true
                });
            }
            const user = yield user_model_1.default.findByIdAndUpdate(userID);
            return res.status(200).json({ user });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denovo mais tarde' });
            }
        }
    }
}));
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.headers.page;
    if (page == 'home') {
        const currentPage = req.query.currentPage;
        try {
            const posts = yield post_model_1.default.find({}).skip(10 * currentPage).limit(10).populate('author').exec();
            return res.status(200).json({ posts });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denove mais tarde' });
            }
        }
    }
    if (page == 'topics') {
        const search = req.query.search;
        try {
            const posts = yield post_model_1.default.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { tags: { $in: [search] } }
                ]
            }).limit(100).populate('author').exec();
            return res.status(200).json({ posts });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no serviidor, tente denove mais tarde' });
            }
        }
    }
}));
app.post('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, user, tags } = req.body;
    try {
        const author = user._id;
        if (!author) {
            return res.status(404).json({ message: 'User not found' });
        }
        const post = yield post_model_1.default.create({
            title: title,
            content: message,
            author: author,
            tags: tags || []
        });
        yield user_model_1.default.findByIdAndUpdate(author, {
            $inc: { posts: 1 }
        }, {
            new: true,
            runValidators: true
        }).exec();
        return res.status(200).json({ post });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        else {
            console.error(err);
            return res.status(500).json({ message: 'Erro No servidor, tente denove mais tarde' });
        }
    }
}));
app.delete('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.headers.page;
    if (page == 'home') {
        const postId = req.query.postId;
        try {
            const post = yield post_model_1.default.findByIdAndDelete(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            yield user_model_1.default.findByIdAndUpdate(post.author, {
                $inc: { posts: -1 }
            }, {
                new: true,
                runValidators: true
            }).exec();
            return res.status(200).json({ post });
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denovo mais tarde' });
            }
        }
    }
}));
app.post('/logout', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }
    try {
        if (!tokenBlacklist.has(token)) {
            tokenBlacklist.add(token);
        }
        return res.status(200).json({ message: 'Logged out sucessfuly' });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        else {
            console.error(err);
            return res.status(500).json({ message: 'Error logging out' });
        }
    }
});
app.use((req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
    next();
});
app.listen(8080, () => console.log('app running on port 8080'));
