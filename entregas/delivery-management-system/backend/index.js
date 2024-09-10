const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = 5000;


app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const empresaRoutes = require('./routes/empresa');
app.use('/api/empresas', empresaRoutes); 

const entregaRoutes = require('./routes/entrega');
app.use('/api/entregas', entregaRoutes); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
