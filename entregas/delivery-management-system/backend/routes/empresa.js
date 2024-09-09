const express = require('express');
const Empresa = require('../models/empresa');
const router = express.Router();

// Rota para cadastrar nova empresa
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, cnpj, cep } = req.body;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !cnpj || !cep) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verificar se o CNPJ tem exatamente 14 dígitos e contém apenas números
    if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
      return res.status(400).json({ message: 'O CNPJ deve conter exatamente 14 números.' });
    }

    // Verificar se a empresa já existe no banco de dados
    const existingEmpresa = await Empresa.findOne({ cnpj });
    if (existingEmpresa) {
      return res.status(400).json({ message: 'Empresa já cadastrada.' });
    }

    // Criar uma nova empresa
    const newEmpresa = new Empresa({ nome, cnpj, cep });

    // Salvar no banco de dados
    await newEmpresa.save();
    res.status(201).json({ message: 'Empresa cadastrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar empresa:', error); // Log detalhado
    res.status(500).json({ message: 'Erro ao cadastrar empresa.', error });
  }
});

// Rota para listar todas as empresas cadastradas
router.get('/listar', async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter lista de empresas' });
  }
});

module.exports = router;
