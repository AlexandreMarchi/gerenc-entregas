const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { name, cpf, password, role } = req.body;

    // Validar dados
    if (!name || !cpf || !password || !role) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Criar novo usuário
    const newUser = new User({
      name,
      cpf,
      password,
      role
    });

    // Salvar no banco de dados
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
});

module.exports = router;
