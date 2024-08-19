const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Rota de login
router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;

  try {
      // Verificar se o usuário existe
      const user = await User.findOne({ cpf });
      if (!user) {
          return res.status(400).json({ message: 'Usuário não encontrado.' });
      }

      // Verificar a senha
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Senha incorreta.' });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: '1h'
      });

      // Resposta de sucesso com o token
      res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
});

module.exports = router;