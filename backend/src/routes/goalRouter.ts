import express from 'express';
import {
    handleCreateGoal,
    handleGetAllGoals,
    handleGetGoalById,
    handleUpdateGoals,
    handleDeleteGoal
} from '../controller/goalsController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para metas (todas protegidas por autenticação)
router.post('/goals', authenticateToken, handleCreateGoal);
router.get('/goals', authenticateToken, handleGetAllGoals);
router.get('/goals/:id', authenticateToken, handleGetGoalById);
router.put('/goals/:id', authenticateToken, handleUpdateGoals);
router.delete('/goals/:id', authenticateToken, handleDeleteGoal);

export default router;