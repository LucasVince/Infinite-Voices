import { Router } from 'express';
import { getComments, createComment } from '../controllers/commentController';
const router = Router();
router.get('/', getComments); // Rota para obter comentários
router.post('/', createComment); // Rota para criar um comentário
export default router;
