const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
import userModel from '../DB/models/user.model';
import postModel from '../DB/models/post.model';

const tokenBlacklist = new Set();

app.use(express.json());
app.use(cors());

app.use((req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token && tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
    next();
});

app.get('/', (req: any, res: any) => {
    return res.status(200).send('Welcome');
});

app.post('/register', async (req:any, res:any) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Informações faltando'});
        }

        const usernameTaken = await userModel.findOne({ username });
        const emailTaken = await userModel.findOne({ email });

        if(usernameTaken || emailTaken) {
            return res.status(400).json({ message: 'Este email ou o username já está foram pegos!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });
        
        const token = await jwt.sign({id: user._id, username: user.username}, process.env.REGISTER_USER_SECET_KEY as string, {expiresIn: '1h'});
        return res.status(200).json({token, user });
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

        return res.status(200).json({ token, user });
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

app.get('/users', async (req: any, res: any) => {
    const page = req.headers.page;

    if (page == 'profile') {
        const id = req.query.userID;

        try {
            const user = await userModel.findById(id);
            return res.status(200).json({ user });
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no serviidor, tente denovo mais tarde' });
            }
        }
    }
});

app.put('/users', async (req:any, res:any) => {
    const page = req.headers.page;

    if (page == 'profile') {
        try {
            const { username, bio, status, temporaryMessage, userID } = req.body;
    
            if (!userID) {
                return res.status(400).json({ message: 'userID is required' });
            }
    
            const usernameAlreadyTaken = await userModel.findOne({ username: username });
    
            if (usernameAlreadyTaken && usernameAlreadyTaken._id != userID) {
                return res.status(400).json({ message: 'username already taken, please, choose other' });
            }
    
            if (username != '') {
                await userModel.findByIdAndUpdate(userID, {
                    username: username
                }, {
                    new: true,
                    runValidators: true
                });
            }
    
            if (bio != '') {
                await userModel.findByIdAndUpdate(userID, {
                    bio: bio
                }, {
                    new: true,
                    runValidators: true
                });
            }
    
            if (temporaryMessage != '') {
                await userModel.findByIdAndUpdate(userID, {
                    temporaryMessage: temporaryMessage
                }, {
                    new: true,
                    runValidators: true
                });
            }
    
            if (status != '') {
                await userModel.findByIdAndUpdate(userID, {
                    status: status
                }, {
                    new: true,
                    runValidators: true
                });
            }
    
            const user = await userModel.findByIdAndUpdate( userID );
    
            return res.status(200).json({ user });
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denovo mais tarde' });
            }
        }
    }
});

app.get('/posts', async (req:any, res:any) => {
    const page  = req.headers.page;

    if (page == 'home') {
        const currentPage = req.query.currentPage;

        try {
            const posts = await postModel.find({}).skip(10 * currentPage).limit(10).populate('author').exec();
    
            return res.status(200).json({posts});
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denove mais tarde' });
            }
        }
    }

    if (page == 'topics') {
        const search = req.query.search;
        
        try {
            const posts = await postModel.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { tags: { $in: [search]}}
                ]
            }).limit(100).populate('author').exec();
            
            return res.status(200).json({posts});
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no serviidor, tente denove mais tarde' });
            }
        }
    }
});

app.post('/posts', async (req: any, res: any) => {
    const { title, message, user, tags } = req.body;

    try {
        const author = user._id;

        if (!author) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = await postModel.create({
            title: title,
            content: message,
            author: author,
            tags: tags || []
        });

        await userModel.findByIdAndUpdate(author, {
            $inc: { posts: 1 }
        }, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json({ post });
    } catch (err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Erro No servidor, tente denove mais tarde' });
        }
    }
});

app.delete('/posts', async (req: any, res: any) => {
    const page = req.headers.page;

    if (page == 'home') {
        const postId = req.query.postId;
        try {
            const post = await postModel.findByIdAndDelete(postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            await userModel.findByIdAndUpdate(post.author, {
                $inc: { posts: -1 }
            }, {
                new: true,
                runValidators: true
            }).exec();

            return res.status(200).json({ post });
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ message: 'Erro no servidor, tente denovo mais tarde' });
            }
        }
    }
});

app.post('/deleteaccount', async (req:any, res:any) => {
    const { userID, password, token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const user = await userModel.findById(userID);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Wrong password fella' });

        await userModel.findByIdAndDelete(userID);

        if (!tokenBlacklist.has(token)) tokenBlacklist.add(token);

        return res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch(err) {
        if (err instanceof Error) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        } else {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting account, try later' });
        }
    }
});

app.post('/logout', (req: any, res: any) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        if (!tokenBlacklist.has(token)) {
            tokenBlacklist.add(token);
        }
        return res.status(200).json({ message: 'Logged out sucessfuly' });
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

app.listen(8080, () => console.log('app running on port 8080'));