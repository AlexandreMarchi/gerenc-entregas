import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      setSuccessMessage('Login realizado com sucesso!');
      setErrorMessage('');

      const { token, role, name } = response.data;

      // Armazena o token e nome no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);

      console.log('Resposta do login:', response.data); // Loga a resposta do servidor

      setTimeout(() => {
        if (role === 'entregador') {
          navigate('/entregador');
        } else {
          navigate('/cliente');
        }
      }, 1500);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Erro desconhecido. Tente novamente.');

      console.error('Erro no login:', error); // Loga o erro
      console.log('Erro detalhes:', error.response?.data); // Loga os detalhes do erro
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            minLength={11}
            maxLength={11}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
      <button className="btn-back" onClick={() => navigate('/')}>Voltar para Início</button>
    </div>
  );
};

export default Login;
