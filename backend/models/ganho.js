const db = require('../config/db');

class Ganho {
    static async criar(aba_id, descricao, valor, observacao) {
        const [result] = await db.execute(
            'INSERT INTO ganhos (aba_id, descricao, valor, observacao) VALUES (?, ?, ?, ?)',
            [aba_id, descricao, valor, observacao || null]
        );
        return result.insertId;
    }

    static async listarPorAba(aba_id) {
        const [rows] = await db.execute('SELECT * FROM ganhos WHERE aba_id = ?', [aba_id]);
        return rows;
    }

    static async calcularTotalPorAba(aba_id) {
        const [rows] = await db.execute('SELECT SUM(valor) as total FROM ganhos WHERE aba_id = ?', [aba_id]);
        return rows[0].total || 0;
    }
    
    static async excluir(id) {
        await db.execute('DELETE FROM ganhos WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Ganho;