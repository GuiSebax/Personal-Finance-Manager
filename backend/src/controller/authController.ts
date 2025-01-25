import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/users';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const handleLogin = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({
            success: false,
            message: 'Email e senha são obrigatórios.'
        })


        return;
    }

    try {
        const user = await getUserByEmail(email);

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            res.status(401).json({
                success: false,
                message: 'Email ou senha incorretos.'
            })

            return;
        }

        const token = jwt.sign({ id: user.id, cargo: user.cargo }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                cargo: user.cargo
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Erro ao realizar login.'
        })
    }
}