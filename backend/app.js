const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});