import db from '../database/database';

// Criar um usuário
export const createUser = (nome: string, email: string, senha: string, cargo: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO usuarios (nome, email, senha, cargo) VALUES (?, ?, ?, ?)',
            [nome, email, senha, cargo],
            function (err) {
                if (err) {
                    console.error('Erro ao criar usuário', err.message);
                    reject(err);
                } else {
                    console.log('Usuário criado com sucesso, ID:', this.lastID);
                    resolve(this.lastID);
                }
            }
        )
    })
}

// Buscar usuarios
export const getAllUsers = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM usuarios', (err, rows) => {
            if (err) {
                console.error('Erro ao buscar usuários', err.message);
                reject(err);
            } else {
                resolve(rows);
            }

        })
    })
}

// Buscar usuário pelo ID
export const getUserById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error('Erro ao buscar usuário', err.message);
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Buscar usuário pelo E-mail(autenticação)
export const getUserByEmail = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
            if (err) {
                console.error('Erro ao buscar usuário', err.message);
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Atualizar usuario
export const updateUser = (id: number, nome: string, email: string, senha: string, cargo: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE usuarios SET nome = ?, email = ?, senha = ?, cargo = ? WHERE id = ?',
            [nome, email, senha, cargo, id],
            (err) => {
                if (err) {
                    console.error('Erro ao atualizar usuário', err.message);
                    reject(err);
                } else {
                    console.log('Usuário atualizado com sucesso');
                    resolve();
                }
            }
        )
    })
}

// Deletar usuario
export const deleteUser = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Erro ao deletar usuário', err.message);
                reject(err);
            } else {
                console.log('Usuário deletado com sucesso');
                resolve();
            }

        })

    })
}

