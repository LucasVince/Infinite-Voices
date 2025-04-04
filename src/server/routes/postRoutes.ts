import { Router } from 'express';
import { getPosts, createPost } from '../controllers/postController';

const router = Router();

router.get('/', getPosts); 
router.post('/', createPost);

export default router;
