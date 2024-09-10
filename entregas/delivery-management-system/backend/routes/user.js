const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { name, cpf, password, role } = req.body;

    if (!name || !cpf || !password || !role) {
      console.log('Dados inválidos:', req.body);
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      console.log('CPF inválido:', cpf);
      return res.status(400).json({ message: 'O CPF deve conter exatamente 11 números.' });
    }

    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
      console.log('Usuário já existe:', cpf);
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      cpf,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
      console.log('Dados inválidos para login:', req.body); 
      return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
    }

    const user = await User.findOne({ cpf });
    if (!user) {
      console.log('Usuário não encontrado para o CPF:', cpf);
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Senha incorreta para o CPF:', cpf);
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login bem-sucedido para o CPF:', cpf);
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
});

module.exports = router;
