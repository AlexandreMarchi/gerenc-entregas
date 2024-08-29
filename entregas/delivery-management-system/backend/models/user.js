const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 11,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['cliente', 'entregador']
  }
});

// Método para hash da senha antes de salvar o usuário
UserSchema.methods.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

// Método para comparar a senha fornecida com a senha armazenada
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Erro ao comparar a senha.');
  }
};

module.exports = mongoose.model('User', UserSchema);
