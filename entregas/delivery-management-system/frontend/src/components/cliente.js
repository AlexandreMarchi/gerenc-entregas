import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/cliente.css';

const Cliente = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/deliveries/pending', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveries(response.data);
      } catch (error) {
        setErrorMessage('Erro ao carregar entregas pendentes.');
        console.error(error.response?.data || error.message);
      }
    };

    fetchDeliveries();
  }, []);

  const handleConfirm = async (deliveryId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/deliveries/confirm/${deliveryId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Entrega confirmada com sucesso!');
      setDeliveries(deliveries.filter((delivery) => delivery._id !== deliveryId));
    } catch (error) {
      setErrorMessage('Erro ao confirmar entrega.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="cliente-container">
      <h2>Entregas Pendentes</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {deliveries.length > 0 ? (
        <ul>
          {deliveries.map((delivery) => (
            <li key={delivery._id}>
              <p>Entrega ID: {delivery._id}</p>
              <p>Produto: {delivery.productName}</p>
              <p>Data de Entrega: {new Date(delivery.deliveryDate).toLocaleDateString()}</p>
              <button onClick={() => handleConfirm(delivery._id)}>Confirmar Entrega</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma entrega pendente.</p>
      )}
    </div>
  );
};

export default Cliente;
