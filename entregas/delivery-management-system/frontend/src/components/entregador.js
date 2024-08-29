import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './style/entregador.css';

const Entregador = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name'); // Obtém o nome do entregador

  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  useEffect(() => {
    // Carregar entregas pendentes
    const fetchPendingDeliveries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/deliveries/pending');
        setPendingDeliveries(response.data);
      } catch (error) {
        console.error('Erro ao carregar entregas pendentes:', error);
      }
    };

    fetchPendingDeliveries();
  }, []);

  const handleConfirmDelivery = async (deliveryId) => {
    try {
      await axios.post(`http://localhost:5000/api/users/deliveries/confirm/${deliveryId}`);
      setPendingDeliveries(pendingDeliveries.filter(delivery => delivery._id !== deliveryId));
      alert('Entrega confirmada com sucesso!');
    } catch (error) {
      console.error('Erro ao confirmar entrega:', error);
      alert('Erro ao confirmar entrega.');
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo(a), entregador(a) {name}</h1>
      
      <div className="options">
        <button onClick={() => alert('Cadastrar Empresa')}>Cadastrar Empresa</button>
        <button onClick={() => alert('Cadastrar Entrega')}>Cadastrar Entrega</button>
      </div>

      <h2>Entregas Pendentes</h2>
      {pendingDeliveries.length > 0 ? (
        <ul className="delivery-list">
          {pendingDeliveries.map(delivery => (
            <li key={delivery._id} className="delivery-item">
              <span>{delivery.description}</span>
              <button onClick={() => handleConfirmDelivery(delivery._id)} className="btn-confirm">Confirmar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma entrega pendente no momento.</p>
      )}
    </div>
  );
};

export default Entregador;
