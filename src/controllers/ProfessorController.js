const db = require ('../database/db');

class ProfessorController {
  // Listar Todos
  static listarTodos(req, res) {
    db.all("SELECT * FROM professores", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

    // Listar por ID
    static listarPorId(req, res) {
      const { id } = req.params;
      db.get("SELECT * FROM professores WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!row) return res.status(404).json({ erro: "Professor não encontrado" });
        return res.status(200).json(row);
      });
    }

    // Salvar
    static salvar(req, res) {
        const { nome, email, titulacao, telefone } = req.body;  
        db.run("INSERT INTO professores (nome, email, titulacao, telefone) VALUES (?, ?, ?, ?)", [nome, email, titulacao, telefone], function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            return res.status(201).json({ id: this.lastID, nome, email, titulacao, telefone });
        });
    }

    // Atualizar
    static atualizar(req, res) {
        const { id } = req.params;
    const { nome, email, titulacao, telefone } = req.body;
        db.run("UPDATE professores SET nome = ?, email = ?, titulacao = ?, telefone = ? WHERE id = ?", [nome, email, titulacao, telefone, id], function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            if (this.changes === 0) return res.status(404).json({ erro: "Professor não encontrado" });
            return res.status(200).json({ id, nome, email, titulacao, telefone });
        });
    }

    // Deletar
    static deletar(req, res) {
        const { id } = req.params;
        db.run("DELETE FROM professores WHERE id = ?", [id], function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            if (this.changes === 0) return res.status(404).json({ erro: "Professor não encontrado" });
            return res.status(200).json({ mensagem: "Professor deletado com sucesso" });
        });
    }
}

module.exports = ProfessorController;