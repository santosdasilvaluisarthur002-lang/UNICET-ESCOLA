const express = require('express');
const estudanteRoutes = require('./src/routes/estudanteRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-output.json');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const matriculaRoutes = require('./src/routes/matriculaRoutes');

const app = express();
const PORT = 3000;

//Disponibiliza a rota de documentação visual
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());


// Registra as rotas da aplicação
app.use('/', estudanteRoutes);
app.use('/cursos', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/matriculas', matriculaRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});