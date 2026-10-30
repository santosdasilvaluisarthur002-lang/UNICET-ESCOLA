const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Registra as rotas da aplicação
app.use('/', estudanteRoutes);
app.use('/cursos', cursoRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});