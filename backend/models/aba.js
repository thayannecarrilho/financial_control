const db = require("../config/db");

class Aba {
  static async criar(mes, ano) {
    const [result] = await db.execute(
      "INSERT INTO abas (mes, ano) VALUES (?,?)",
      [mes, ano]
    );
    return result.insertId;
  }
  static async listar() {
    const [rows] = await db.execute(
      "SELECT * FROM abas ORDER BY ano DESC, mes DESC"
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.execute("SELECT * FROM abas WHERE id = ?", [id]);
    return rows[0];
  }

  static async buscarPorMesAno(mes, ano) {
    const [rows] = await db.execute(
      "SELECT * FROM abas WHERE mes = ? AND ano = ?",
      [mes, ano]
    );
    return rows[0];
  }

  static async excluir(id) {
    await db.execute("DELETE FROM abas WHERE id = ?", [id]);
    return true;
  }
}

module.exports = Aba;
