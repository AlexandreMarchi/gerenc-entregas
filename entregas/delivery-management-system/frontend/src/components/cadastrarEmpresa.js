import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/cadastrarEmpresa.css';


// Função para formatar o CNPJ para exibição
const formatCNPJ = (cnpj) => {
    const cleaned = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cleaned.length <= 14) {
        return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'); // Formata o CNPJ
    }
    return cleaned;
};

const CadastrarEmpresa = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    cep: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cnpj') {
      setFormData({
        ...formData,
        [name]: formatCNPJ(value) // Formata o CNPJ para exibição
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanedCNPJ = formData.cnpj.replace(/\D/g, ''); // Remove formatação antes de enviar
      const response = await axios.post('http://localhost:5000/api/empresas/cadastrar', {
        ...formData,
        cnpj: cleanedCNPJ
      });
      console.log(response.data);
      setSuccessMessage('Empresa cadastrada com sucesso!');
      setErrorMessage('');
      setFormData({ nome: '', cnpj: '', cep: '' });
    } catch (error) {
      setErrorMessage('Erro ao cadastrar empresa. Verifique os dados e tente novamente.');
      setSuccessMessage('');
      console.error(error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate('/entregador');
  }

  return (
    <div className="empresa-container">
      <h2>Cadastrar Empresa</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome/Razão Social:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnpj">CNPJ:</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
            maxLength={18} // Permite a formatação com caracteres especiais
          />
        </div>
        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={8}
            pattern="\d{8}" // Valida o formato do CEP
          />
        </div>
        <button type="submit" className="btn-cadastrar">Cadastrar Empresa</button>
        <button onClick={handleBack} className="btn-back">Voltar</button>
      </form>
    </div>
  );
};

export default CadastrarEmpresa;
