import express from 'express';
import {
    handleCreateTransaction,
    handleGetAllTransactions,
    handleGetTransactionById,
    handleUpdateTransaction,
    handleDeleteTransaction
} from '../controller/transactionController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para transações (todas protegidas por autenticação)
router.post('/transactions', authenticateToken, handleCreateTransaction);
router.get('/transactions', authenticateToken, handleGetAllTransactions);
router.get('/transactions/:id', authenticateToken, handleGetTransactionById);
router.put('/transactions/:id', authenticateToken, handleUpdateTransaction);
router.delete('/transactions/:id', authenticateToken, handleDeleteTransaction);

export default router;