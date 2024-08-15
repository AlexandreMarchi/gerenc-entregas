const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/entregas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Rotas
app.get('/', (req, res) => {
  res.send('Sistema de Gerenciamento de Entregas');
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
