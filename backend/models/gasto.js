const db = require('../config/db');

class Gasto {
    static async criar(aba_id, descricao, valor, observacao) {
        const [result] = await db.execute(
            'INSERT INTO gastos (aba_id, descricao, valor, observacao) VALUES (?, ?, ?, ?)',
            [aba_id, descricao, valor, observacao || null]
        );
        return result.insertId;
    }

    static async listarPorAba(aba_id) {
        const [rows] = await db.execute('SELECT * FROM gastos WHERE aba_id = ?', [aba_id]);
        return rows;
    }

    static async calcularTotalPorAba(aba_id) {
        const [rows] = await db.execute('SELECT SUM(valor) as total FROM gastos WHERE aba_id = ?', [aba_id]);
        return rows[0].total || 0;
    }

    static async excluir(id) {
        await db.execute('DELETE FROM gastos WHERE id = ?', [id]);
        return true;
    }
    
}

module.exports = Gasto;