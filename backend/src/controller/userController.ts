import { createUser, updateUser, getAllUsers, getUserById, getUserByEmail, deleteUser } from "../models/users";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// criar um novo usuário
export const handleCreateUser = async (req: Request, res: Response) => {
    const { nome, email, senha, cargo } = req.body;

    if (!nome || !email || !senha) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha os campos 'nome', 'email' e 'senha'."
        });

        return;
    }

    if (cargo !== 'admin' && cargo !== 'usuario') {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. O campo 'cargo' deve ser 'admin' ou 'usuário."
        });

        return;
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "E-mail já cadastrado."
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const userID = await createUser(nome, email, hashedPassword, cargo);
        res.status(201).json({
            success: true,
            data: { userID },
            message: "Usuário criado com sucesso!"
        })

        return;
    } catch (error) {
        console.log("Erro ao criar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao criar usuário. Tente novamente."
        });

        return;
    }
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar usuários:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar usuários. Tente novamente."
        });

        return;
    }
}

export const handleGetUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID do usuário."
        });

        return;
    }

    try {
        const user = await getUserById(Number(id));
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });

            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });

        return;
    } catch (error) {
        console.log("Erro ao buscar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar usuário. Tente novamente."
        });

        return;
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, senha, cargo } = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID do usuário."
        });

        return;
    }

    if (!nome && !email && !senha) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe ao menos um campo para atualização."
        });

        return;
    }

    if (cargo && cargo !== 'admin' && cargo !== 'usuario') {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. O campo 'cargo' deve ser 'admin' ou 'usuário."
        });

        return;
    }

    try {
        const fieldsToUpdate: { nome?: string, email?: string, senha?: string, cargo?: string } = {};
        if (nome) fieldsToUpdate.nome = nome;
        if (email) {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                res.status(409).json({
                    success: false,
                    message: "E-mail já cadastrado."
                });
                return;
            }

            fieldsToUpdate.email = email;
        }

        if (senha) fieldsToUpdate.senha = await bcrypt.hash(senha, 10);
        if (cargo) fieldsToUpdate.cargo = cargo;

        await updateUser(Number(id), fieldsToUpdate.nome || '',
            fieldsToUpdate.email || '',
            fieldsToUpdate.senha || '',
            fieldsToUpdate.cargo || '');

        res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso!"
        });

    } catch (error) {
        console.log("Erro ao atualizar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar usuário. Tente novamente."
        });

        return;
    }

}

export const handleDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Informe o ID do usuário."
        });

        return;
    }

    try {
        await deleteUser(Number(id));
        res.status(200).json({
            success: true,
            message: "Usuário deletado com sucesso!"
        });

        return;
    } catch (error) {
        console.log("Erro ao deletar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao deletar usuário. Tente novamente."
        });

        return;
    }
}