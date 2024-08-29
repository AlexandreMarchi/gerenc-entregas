import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/register.css';

const Register = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const cpf = event.target.cpf.value;

    // Verifica se o CPF tem exatamente 11 dígitos
    if (cpf.length !== 11) {
      setErrorMessage('O CPF deve conter exatamente 11 números.');
      setSuccessMessage('');
      return;
    }

    const user = {
      name: event.target.name.value,
      cpf,
      password: event.target.password.value,
      role: event.target.role.value
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', user);
      console.log('Usuário registrado com sucesso:', response.data);
      setSuccessMessage('Usuário registrado com sucesso!');
      setErrorMessage(''); // Limpa mensagens de erro, se houver
    } catch (error) {
      if (error.response) {
        console.error('Erro ao registrar usuário:', error.response.data);
        setErrorMessage('Erro ao registrar usuário. Verifique os dados e tente novamente.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      } else if (error.request) {
        console.error('Nenhuma resposta recebida do servidor:', error.request);
        setErrorMessage('Nenhuma resposta recebida do servidor.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      } else {
        console.error('Erro ao configurar a solicitação:', error.message);
        setErrorMessage('Erro ao configurar a solicitação.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      }
    }
  };

  const handleCpfChange = (event) => {
    const { value } = event.target;
    // Permite apenas números e limita a 11 caracteres
    if (/^\d*$/.test(value) && value.length <= 11) {
      event.target.value = value;
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" required />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            required
            onChange={handleCpfChange}
            minLength={11}
            maxLength={11}
          />
        </label>
        <label>
          Senha:
          <input type="password" name="password" required />
        </label>
        <label>
          Função:
          <select name="role" required>
            <option value="cliente">Cliente</option>
            <option value="entregador">Entregador</option>
          </select>
        </label>
        <button type="submit">Registrar</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="register-buttons">
        <Link to="/">
          <button className="back-button">Voltar ao Início</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Fazer Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
