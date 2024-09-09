const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  cnpj: {
    type: String,
    required: true,
    unique: true,
    minlength: 14,
    maxlength: 14
  },
  cep: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8
  }
});

const Empresa = mongoose.model('Empresa', EmpresaSchema);

module.exports = mongoose.model('Empresas', EmpresaSchema);
