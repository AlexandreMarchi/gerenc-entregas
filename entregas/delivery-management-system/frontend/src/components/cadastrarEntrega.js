import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './style/cadastrarEntrega.css';

const CadastrarEntrega = () => {
  const [formData, setFormData] = useState({
    destinatario: '',
    cpf: '',
    rua: '',
    numero: '',
    complemento: '',
    descricao: '',
    peso: '',
    dataPrevista: '',
    empresa: ''
  });

  const [empresas, setEmpresas] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/empresas/listar');
        setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao carregar empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/entregas/cadastrar', formData);
      setSuccessMessage('Entrega cadastrada com sucesso!');
      setErrorMessage('');
      setFormData({
        destinatario: '',
        cpf: '',
        rua: '',
        numero: '',
        complemento: '',
        descricao: '',
        peso: '',
        dataPrevista: '',
        empresa: ''
      });
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Erro ao cadastrar entrega. Verifique os dados e tente novamente.');
      setSuccessMessage('');
      console.error(error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate('/entregador');
  };

  return (
    <div className="entrega-container">
      <h2>Cadastrar Entrega</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destinatario">Nome do Destinatário:</label>
          <input
            type="text"
            id="destinatario"
            name="destinatario"
            value={formData.destinatario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF do destinatário:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            maxLength={11}
            pattern="\d{11}"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rua">Rua:</label>
          <input
            type="text"
            id="rua"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numero">Número:</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="complemento">Complemento (opcional):</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição do Item:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="peso">Peso (em kg):</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dataPrevista">Data Prevista de Entrega:</label>
          <input
            type="date"
            id="dataPrevista"
            name="dataPrevista"
            value={formData.dataPrevista}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="empresa">Empresa:</label>
          <select
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa._id} value={empresa._id}>
                {empresa.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-cadastrar">Cadastrar Entrega</button>
        <button onClick={handleBack} className="btn-back">Voltar</button>
      </form>
    </div>
  );
};

export default CadastrarEntrega;
