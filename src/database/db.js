const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o arquivo escola.db na raiz do projeto
const dbPath = path.resolve(__dirname, '../../escola.db');
const db = new sqlite3.Database(dbPath);

// Inicializa a tabela caso ela não exista
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS estudantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      telefone TEXT
    )
  `);


  // 2. Tabela de Cursos
  db.run(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cargaHoraria INTEGER NOT NULL,
      turno TEXT NOT NULL
    )
  `);

  // 3. Tabela de Disciplinas (ligada a Cursos)
  db.run(`
    CREATE TABLE IF NOT EXISTS disciplinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      codigo TEXT NOT NULL UNIQUE,
      cargaHoraria INTEGER NOT NULL,
      curso_id INTEGER NOT NULL,
      FOREIGN KEY (curso_id) REFERENCES cursos(id)
    )
  `);

  // 4. Tabela de Matrículas (liga Estudantes a Cursos)
  db.run(`
    CREATE TABLE IF NOT EXISTS matriculas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estudante_id INTEGER NOT NULL,
      curso_id INTEGER NOT NULL,
      numeroMatricula TEXT NOT NULL UNIQUE,
      dataMatricula TEXT NOT NULL,
      status TEXT DEFAULT 'ATIVA',
      FOREIGN KEY (estudante_id) REFERENCES estudantes(id),
      FOREIGN KEY (curso_id) REFERENCES cursos(id)
    )
  `);
});

module.exports = db;