const express = require('express');
const Entrega = require('../models/entrega');
const router = express.Router();


const getNextId = async () => {
  const lastEntrega = await Entrega.findOne().sort({ idEntrega: -1 });
  return lastEntrega ? lastEntrega.idEntrega + 1 : 1;
};

module.exports = { getNextId };

router.post('/cadastrar', async (req, res) => {
  try {
    const { destinatario, cpf, rua, numero, complemento, descricao, peso, dataPrevista, empresa } = req.body;

    if (!destinatario || !cpf || !rua || !numero || !descricao || !peso || !dataPrevista || !empresa) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Gerar novo ID para a entrega
    const idEntrega = await getNextId();

    // Criar nova entrega
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
    const entregas = await Entrega.find(); // Ajuste a consulta conforme necessário
    res.json(entregas);
  } catch (error) {
    console.error('Erro ao listar entregas:', error);
    res.status(500).json({ message: 'Erro ao listar entregas.', error });
  }
});

module.exports = router;
