import express from 'express';
import {
    handleCreateUser,
    handleDeleteUser,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser
} from '../controller/userController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para usuários
router.post('/register', handleCreateUser); // Cadastro de usuários (aberto)
router.get('/users', authenticateToken, handleGetAllUsers); // Somente admins podem listar todos os usuários
router.get('/users/:id', authenticateToken, handleGetUserById); // Protegido, qualquer usuário autenticado pode ver os dados
router.put('/users/:id', authenticateToken, handleUpdateUser); // Protegido, usuários autenticados podem atualizar
router.delete('/users/:id', authenticateToken, authorizeAdmin, handleDeleteUser); // Somente admins podem deletar usuários

export default router;