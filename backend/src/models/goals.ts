import db from '../database/database';

// Criar uma meta
export const createGoal = (userID: number, quantidade: number, periodo: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO metas (userID, quantidade, periodo) VALUES (?, ?, ?',
            [userID, quantidade, periodo],
            function (err) {
                if (err) {
                    console.error('Erro ao inserir meta', err.message);
                    reject(err);
                } else {
                    console.log('Meta inserida com sucesso');
                    resolve(this.lastID);
                }
            }
        )
    })
}

// Listar todas as metas
export const getAllGoals = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM metas', (err, rows) => {
            if (err) {
                console.error('Erro ao buscar metas', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

// Buscar a meta pelo ID
export const getGoalById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM metas WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error('Erro ao buscar meta', err.message);
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Atualizar a meta 
export const updateGoal = (id: number, userID: number, quantidade: number, periodo: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE metas SET userID = ?, quantidade = ?, periodo = ? WHERE id = ?',
            [userID, quantidade, periodo, id],

            (err) => {
                if (err) {
                    console.error('Erro ao atualizar meta', err.message);
                    reject(err);
                } else {
                    console.log('Meta atualizada com sucesso');
                    resolve();
                }
            }
        )
    })
}

// Deletar a meta
export const deleteGoal = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM metas WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Erro ao deletar meta', err.message);
                reject(err);
            } else {
                console.log('Meta deletada com sucesso');
                resolve();
            }
        })
    })
}   