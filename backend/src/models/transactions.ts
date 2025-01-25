import db from '../database/database';

// Criar uma transação
export const createTransactions = (userID: number, quantidade: number, tipo: string,
    categoria: string, descricao: string, date: string): Promise<number> => {

    return new Promise((resolve, reject) => {
        db.run('INSERT INTO transacoes (userID, quantidade, tipo, categoria, descricao, date) VALUES (?, ?, ?, ?, ?, ?)',
            [userID, quantidade, tipo, categoria, descricao, date],
            function (err) {
                if (err) {
                    console.error('Erro ao inserir transação', err.message);
                    reject(err);
                } else {
                    console.log('Transação inserida com sucesso');
                    resolve(this.lastID);
                }
            }
        )
    })
}

// Listar todas as transações
export const getAllTransactions = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM transacoes', (err, rows) => {
            if (err) {
                console.error('Erro ao buscar transações', err.message);
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

// Buscar a transação pelo ID
export const getTransactionById = (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM transacoes WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error('Erro ao buscar transação', err.message);
                reject(err);
            } else {
                resolve(row);
            }
        })
    })
}

// Atualizar a transação
export const updateTransaction = (id: number, userID: number, quantidade: number, tipo: string,
    categoria: string, descricao: string, date: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE transacoes SET userID = ?, quantidade = ?, tipo = ?, categoria = ?, descricao = ?, date = ? WHERE id = ?',
            [userID, quantidade, tipo, categoria, descricao, date, id],

            (err) => {
                if (err) {
                    console.error('Erro ao atualizar transação', err.message);
                    reject(err);
                } else {
                    console.log('Transação atualizada com sucesso');
                    resolve();
                }
            }
        )
    })
}

// Deletar a transação
export const deleteTransaction = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM transacoes WHERE id = ?', [id], (err) => {
            if (err) {
                console.error('Erro ao deletar transação', err.message);
                reject(err);
            } else {
                console.log('Transação deletada com sucesso');
                resolve();
            }
        })
    })
}
