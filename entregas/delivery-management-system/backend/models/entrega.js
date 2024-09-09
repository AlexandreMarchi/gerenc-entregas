const mongoose = require('mongoose');

const entregaSchema = new mongoose.Schema({
  idEntrega: { type: Number, unique: true, required: true},
  destinatario: { type: String, required: true },
  cpf: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: String, required: true },
  complemento: { type: String, required: false },
  descricao: { type: String, required: true },
  peso: { type: Number, required: true },
  dataPrevista: { type: Date, required: true },
  empresa: { type: String, required: true},
  status: { type: String, enum: ['Pendente', 'Aguardando confirmação', 'Confirmada'], default: 'Pendente'}
});

const Entrega = mongoose.model('Entrega', entregaSchema);
module.exports = Entrega;
