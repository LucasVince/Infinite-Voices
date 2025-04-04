import express from 'express';
import cors from 'cors';
import { tokenBlacklistMiddleware } from '../middlewares/tokenBlacklistMiddleware';
import userRoutes from '../routes/userRoutes';
import postRoutes from '../routes/postRoutes';
import commentRoutes from '../routes/commentRoutes';
const app = express();
app.use(express.json());
app.use(cors());
// Aplicar o middleware apenas às rotas que precisam dele
app.use('/users', tokenBlacklistMiddleware, userRoutes);
app.use('/posts', tokenBlacklistMiddleware, postRoutes);
app.use('/comments', tokenBlacklistMiddleware, commentRoutes);
// Rota principal
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo a API Infinite Voices' });
});
export default app;
