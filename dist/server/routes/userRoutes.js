import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController';
const router = Router();
router.post('/register', registerUser); // Rota para registro de usuário
router.post('/login', loginUser); // Rota para login de usuário
router.post('/logout', logoutUser); // Rota para logout de usuário
export default router;
