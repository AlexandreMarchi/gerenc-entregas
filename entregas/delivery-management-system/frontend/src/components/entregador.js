import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/entregador.css';

const Entregador = () => {
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  const [entregas, setEntregas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [deliveryIdToConfirm, setDeliveryIdToConfirm] = useState('');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/entregas/listar');
        setEntregas(response.data);
      } catch (error) {
        setErrorMessage('Erro ao carregar entregas.');
        console.error('Erro ao carregar entregas:', error);
      }
    };

    fetchEntregas();
  }, []);

  const confirmarEntrega = async () => {
    try {
      await axios.put(`http://localhost:5000/api/entregas/confirmar/${deliveryIdToConfirm}`);
      setEntregas(entregas.map(entrega =>
        entrega._id === deliveryIdToConfirm ? { ...entrega, status: 'Aguardando confirmação' } : entrega
      ));
      setDeliveryIdToConfirm('');
    } catch (error) {
      setErrorMessage('Erro ao confirmar entrega.');
      console.error('Erro ao confirmar entrega:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
        return 'status-pendente';
      case 'Aguardando confirmação':
        return 'status-aguardando';
      case 'Confirmada':
        return 'status-confirmada';
      default:
        return '';
    }
  };

  const handleCadastrarEmpresa = () => {
    navigate('/cadastrarEmpresa');
  };

  const handleCadastrarEntrega = () => {
    navigate('/cadastrarEntrega');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Bem-vindo(a), entregador(a) {name}</h1>

      <div className="options">
        <button onClick={handleCadastrarEmpresa}>Cadastrar Empresa</button>
        <button onClick={handleCadastrarEntrega}>Cadastrar Entrega</button>
      </div>

      <h2>Confirmar Entrega</h2>
      <input
        type="text"
        value={deliveryIdToConfirm}
        onChange={(e) => setDeliveryIdToConfirm(e.target.value)}
        placeholder="ID da Entrega"
      />
      <button onClick={confirmarEntrega} className="btn-confirm">Confirmar Entrega</button>
      
      <h2>Entregas Disponíveis</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {entregas.map(entrega => (
          <li key={entrega._id}>
            <h3>Entrega #{entrega.idEntrega}</h3>
            <p><strong>Destinatário:</strong> {entrega.destinatario}</p>
            <p><strong>Endereço:</strong> {entrega.rua}, <strong>Número:</strong> {entrega.numero}</p>
            <p><strong>Descrição:</strong> {entrega.descricao}</p>
            <p><strong>Peso:</strong> {entrega.peso} kg</p>
            <p><strong>Status:</strong> <span className={getStatusClass(entrega.status)}>{entrega.status}</span></p>
          </li>
        ))}
      </ul>
      <button onClick={handleBack} className="btn-back">Sair</button>
    </div>
  );
};

export default Entregador;