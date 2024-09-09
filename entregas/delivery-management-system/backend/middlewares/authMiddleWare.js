const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Obter o token do cabeçalho Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Se não houver token, retorna um erro
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adicionar o usuário decodificado ao objeto req para uso posterior
    req.user = decoded;

    // Passar para o próximo middleware/handler
    next();
  } catch (error) {
    // Retornar um erro se o token for inválido
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
