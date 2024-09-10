const express = require('express');
const Entrega = require('../models/entrega');
const router = express.Router();

const getNextId = async () => {
  const lastEntrega = await Entrega.findOne().sort({ idEntrega: -1 });
  return lastEntrega ? lastEntrega.idEntrega + 1 : 1;
};

router.post('/cadastrar', async (req, res) => {
  try {
    const { destinatario, cpf, rua, numero, complemento, descricao, peso, dataPrevista, empresa } = req.body;

    if (!destinatario || !cpf || !rua || !numero || !descricao || !peso || !dataPrevista || !empresa) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const idEntrega = await getNextId();

    const novaEntrega = new Entrega({
      idEntrega,
      destinatario,
      cpf,
      rua,
      numero,
      complemento,
      descricao,
      peso,
      dataPrevista,
      empresa,
      status: 'Pendente'
    });

    await novaEntrega.save();
    res.status(201).json({ message: 'Entrega cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar entrega:', error);
    res.status(500).json({ message: 'Erro ao cadastrar entrega.', error });
  }
});

router.get('/listar', async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.json(entregas);
  } catch (error) {
    console.error('Erro ao listar entregas:', error);
    res.status(500).json({ message: 'Erro ao listar entregas.', error });
  }
});

router.get('/listar/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;
        const entregas = await Entrega.find({ cpf, status: { $in: ['Pendente', 'Aguardando confirmação'] } });
    
    if (entregas.length === 0) {
      return res.status(404).json({ message: 'Nenhuma entrega pendente ou aguardando confirmação encontrada.' });
    }

    res.json(entregas);
  } catch (error) {
    console.error('Erro ao listar entregas:', error);
    res.status(500).json({ message: 'Erro ao listar entregas.', error });
  }
});

router.put('/confirmar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const entrega = await Entrega.findOne({ idEntrega: id });
    if (!entrega) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    let newStatus;
    if (entrega.status === 'Pendente') {
      newStatus = 'Aguardando confirmação';
    } else if (entrega.status === 'Aguardando confirmação') {
      newStatus = 'Confirmada';
    } else {
      return res.status(400).json({ message: 'Status inválido para atualização' });
    }

    const updatedEntrega = await Entrega.findOneAndUpdate(
      { idEntrega: id },
      { status: newStatus }, 
      { new: true }
    );

    res.json(updatedEntrega);
  } catch (error) {
    console.error('Erro ao atualizar entrega:', error);
    res.status(500).json({ message: 'Erro ao atualizar entrega', error });
  }
});

module.exports = router;