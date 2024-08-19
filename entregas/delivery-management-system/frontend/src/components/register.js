import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css'; // Importa o CSS

const Register = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const user = {
      name: event.target.name.value,
      cpf: event.target.cpf.value,
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
        // A resposta do servidor foi recebida e é diferente de 2xx
        console.error('Erro ao registrar usuário:', error.response.data);
        setErrorMessage('Erro ao registrar usuário. Verifique os dados e tente novamente.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta
        console.error('Nenhuma resposta recebida do servidor:', error.request);
        setErrorMessage('Nenhuma resposta recebida do servidor.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      } else {
        // Erro ao configurar a solicitação
        console.error('Erro ao configurar a solicitação:', error.message);
        setErrorMessage('Erro ao configurar a solicitação.');
        setSuccessMessage(''); // Limpa mensagem de sucesso, se houver
      }
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
          <input type="text" name="cpf" required />
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
