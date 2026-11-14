const db = require('../database/db');

class NotaController {
    // GET /notas - Listar todas as notas com os nomes do Estudante e Disciplina (JOIN)
    static listarTodos(req, res) {
        const sql = `
            SELECT n.id, n.valor, e.nome AS estudante, d.nome AS disciplina
            FROM notas n
            JOIN estudantes e ON n.estudanteId = e.id
            JOIN disciplinas d ON n.disciplinaId = d.id
        `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            return res.status(200).json(rows);
        });
    }

    // GET /notas/:id - Buscar nota por ID
    static listarPorId(req, res) {
        const { id } = req.params;
        const sql = `
            SELECT n.id, n.valor, e.nome AS estudante, d.nome AS disciplina
            FROM notas n
            JOIN estudantes e ON n.estudanteId = e.id
            JOIN disciplinas d ON n.disciplinaId = d.id
            WHERE n.id = ?
        `;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (!row) {
                return res.status(404).json({ erro: 'Nota não encontrada' });
            }
            return res.status(200).json(row);
        });
    }

    // POST /notas - Cadastrar nota
    static salvar(req, res) {
        const { valor, estudanteId, disciplinaId } = req.body;

        if (!valor || !estudanteId || !disciplinaId) {
            return res.status(400).json({ erro: 'Campos obrigatórios: valor, estudanteId, disciplinaId' });
        }

        const sql = `
            INSERT INTO notas (valor, estudanteId, disciplinaId)
            VALUES (?, ?, ?)
        `;  

        db.run(sql, [valor, estudanteId, disciplinaId], function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            return res.status(201).json({ id: this.lastID, valor, estudanteId, disciplinaId });
        });
    }

    // PUT /notas/:id - Atualizar nota
    static atualizar(req, res) {
        const { id } = req.params;
        const { valor, estudanteId, disciplinaId } = req.body;

        if (!valor || !estudanteId || !disciplinaId) {
            return res.status(400).json({ erro: 'Campos obrigatórios: valor, estudanteId, disciplinaId' });
        }   

        const sql = `
            UPDATE notas        
            SET valor = ?, estudanteId = ?, disciplinaId = ?
            WHERE id = ?
        `;  
        db.run(sql, [valor, estudanteId, disciplinaId, id], function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            return res.status(200).json({ id, valor, estudanteId, disciplinaId });
        });
    }

    // DELETE /notas/:id - Deletar nota 
    static deletar(req, res) {
        const { id } = req.params;
        const sql = `DELETE FROM notas WHERE id = ?`;
        db.run(sql, [id], function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            return res.status(200).json({ mensagem: 'Nota deletada com sucesso' });
        });
    }
}

module.exports = NotaController;