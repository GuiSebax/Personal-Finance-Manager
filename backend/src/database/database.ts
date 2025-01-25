import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'Finance.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados');
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL,
                cargo TEXT NOT NULL CHECK(cargo IN ('admin', 'usuario'))
            );`,
            (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela usuarios', err.message);
                } else {
                    console.log('Tabela usuarios criada com sucesso');
                }
            });

        db.run(`CREATE TABLE IF NOT EXISTS transacoes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userID INTEGER NOT NULL,
                quantidade REAL NOT NULL CHECK(quantidade > 0),
                tipo TEXT NOT NULL CHECK(type IN ('renda', 'despesa')),
                categoria TEXT NOT NULL,
                descricao TEXT,
                date TEXT NOT NULL,
                FOREIGN KEY (userID) REFERENCES usuarios(id) ON DELETE cascade 
                );`,
            (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela de transações', err.message);
                } else {
                    console.log('Tabela de transações criada com sucesso');
                }
            });

        db.run(`CREATE TABLE IF NOT EXISTS metas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userID INTEGER NOT NULL,
                quantidade REAL NOT NULL CHECK (quantidade > 0),
                periodo TEXT NOT NULL,
                FOREIGN KEY (userID) REFERENCES usuarios(id) ON DELETE cascade
                );`,
            (err) => {
                if (err) {
                    console.error('Erro ao criar a tabela de metas', err.message);
                } else {
                    console.log('Tabela de metas criada com sucesso');
                }
            });

    }
})

export default db;