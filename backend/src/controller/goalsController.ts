import { Request, Response } from "express";
import { createGoal, getAllGoals, getGoalById, deleteGoal, updateGoal } from "../models/goals";

export const handleCreateGoal = async (req: Request, res: Response) => {
    const { userID, quantidade, periodo } = req.body;

    if (!userID || !quantidade || !periodo) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha todos os campos."
        });

        return;
    }

    try {
        const goal = await createGoal(userID, quantidade, periodo);

        res.status(201).json({
            success: true,
            data: { goal },
            message: "Meta criada com sucesso!"
        })

        return;
    } catch (error) {
        console.log("Erro ao criar meta", error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar meta. Tente novamente."
        })

        return;
    }
}

export const handleGetAllGoals = async (req: Request, res: Response) => {

    try {
        const goals = await getAllGoals();

        res.status(200).json({
            success: true,
            data: goals
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar metas", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar metas. Tente novamente."
        });

        return;
    }
}

export const handleGetGoalById = async (req: Request, res: Response) => {

    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da meta."
        });

        return;
    }

    try {
        const goal = await getGoalById(Number(id));
        if (!goal) {
            res.status(404).json({
                success: false,
                message: "Meta não encontrada."
            });

            return;
        }

        res.status(200).json({
            success: true,
            data: goal
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar meta", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar meta. Tente novamente."
        });

        return;
    }
}

export const handleUpdateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userID, quantidade, periodo } = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da meta."
        });

        return;
    }

    if (!userID && !quantidade && !periodo) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe ao menos um campo para atualização."
        });

        return;
    }

    try {
        const fieldsToUpdate: { userID?: number, quantidade?: number, periodo?: string } = {};
        if (userID) fieldsToUpdate.userID = userID;
        if (quantidade) fieldsToUpdate.quantidade = quantidade;
        if (periodo) fieldsToUpdate.periodo = periodo;

        await updateGoal(Number(id), fieldsToUpdate.userID || 0,
            fieldsToUpdate.quantidade || 0,
            fieldsToUpdate.periodo || "");


        res.status(200).json({
            success: true,
            message: "Meta atualizada com sucesso!"
        });

    } catch (error) {
        console.log("Erro ao atualizar meta", error);
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar meta. Tente novamente."
        });

        return;
    }
}

export const handleDeleteGoal = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da meta."
        });

        return;
    }

    try {
        await deleteGoal(Number(id));

        res.status(200).json({
            success: true,
            message: "Meta deletada com sucesso!"
        });

        return;
    } catch (error) {
        console.log("Erro ao deletar meta", error);
        res.status(500).json({
            success: false,
            message: "Erro ao deletar meta. Tente novamente."
        });

        return;
    }
}