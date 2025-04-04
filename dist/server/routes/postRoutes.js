import { Router } from 'express';
import { getPosts, createPost } from '../controllers/postController';
const router = Router();
router.get('/', getPosts); // Rota para obter posts
router.post('/', createPost); // Rota para criar um post
export default router;
