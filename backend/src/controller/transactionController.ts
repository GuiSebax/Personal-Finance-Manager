import { Request, Response } from "express";
import { createTransactions, getAllTransactions, getTransactionById, deleteTransaction, updateTransaction } from "../models/transactions";

export const handleCreateTransaction = async (req: Request, res: Response) => {
    const { userID, quantidade, tipo, categoria, descricao, date } = req.body;

    if (!userID || !quantidade || !tipo || !categoria || !date) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha todos os campos."
        });

        return;
    }

    try {
        const transaction = await createTransactions(userID, quantidade, tipo, categoria, descricao, date);

        res.status(201).json({
            success: true,
            data: { transaction },
            message: "Transação criada com sucesso!"
        })

        return;
    } catch (error) {
        console.log("Erro ao criar usuário", error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar transação. Tente novamente."
        })

        return;
    }
}


export const handleGetAllTransactions = async (req: Request, res: Response) => {

    try {
        const transactions = await getAllTransactions();

        res.status(200).json({
            success: true,
            data: transactions
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar transações", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar transações. Tente novamente."
        });

        return;
    }
}


export const handleGetTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da transação."
        });

        return;
    }

    try {
        const transaction = await getTransactionById(Number(id));
        if (!transaction) {
            res.status(404).json({
                success: false,
                message: "Transação não encontrada."
            });

            return;
        }

        res.status(200).json({
            success: true,
            data: transaction
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar transação", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar transação. Tente novamente."
        });

        return;
    }
}

export const handleUpdateTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userID, quantidade, tipo, categoria, descricao, date } = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da transação."
        });

        return;
    }

    if (!userID || !quantidade || !tipo || !categoria || !date) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha todos os campos."
        });

        return;
    }

    try {
        const fieldsToUpdate: { userID?: number, quantidade?: number, tipo?: string, categoria?: string, descricao?: string, date?: string } = {};
        if (userID) fieldsToUpdate.userID = userID;
        if (quantidade) fieldsToUpdate.quantidade = quantidade;
        if (tipo) fieldsToUpdate.tipo = tipo;
        if (categoria) fieldsToUpdate.categoria = categoria;
        if (descricao) fieldsToUpdate.descricao = descricao;
        if (date) fieldsToUpdate.date = date;

        await updateTransaction(Number(id), fieldsToUpdate.userID || 0,
            fieldsToUpdate.quantidade || 0,
            fieldsToUpdate.tipo || "",
            fieldsToUpdate.categoria || "",
            fieldsToUpdate.descricao || "",
            fieldsToUpdate.date || "");

        res.status(200).json({
            success: true,
            message: "Transação atualizada com sucesso!"
        })

    } catch (error) {
        console.log("Erro ao atualizar transação", error);
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar transação. Tente novamente."
        });

        return;
    }

}

export const handleDeleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID da transação."
        });

        return;
    }

    try {
        await deleteTransaction(Number(id));
        res.status(200).json({
            success: true,
            message: "Transação deletada com sucesso!"
        });

        return;
    } catch (error) {
        console.log("Erro ao deletar transação", error);
        res.status(500).json({
            success: false,
            message: "Erro ao deletar transação. Tente novamente."
        });
    }
}