import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/cliente.css';
import { useNavigate } from 'react-router-dom'; 

const Cliente = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const cpf = localStorage.getItem('cpf');
  
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/entregas/listar/${cpf}`);
        setDeliveries(response.data);
      } catch (error) {
        setErrorMessage('Nenhuma entrega pendente.');
        console.error(error.response?.data || error.message);
      }
    };

    fetchDeliveries();
  }, [cpf]);

  const handleConfirm = async (deliveryId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(`http://localhost:5000/api/entregas/confirmar/${deliveryId}`,
        { status: 'Confirmada' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Entrega confirmada com sucesso!');
      setDeliveries(deliveries.map((delivery) => 
        delivery.idEntrega === deliveryId ? { ...delivery, status: 'Confirmada' } : delivery
      ));
    } catch (error) {
      setErrorMessage('Erro ao confirmar entrega.');
      console.error(error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate('/');
  }

  return (
    <div className="cliente-container">
      <h2>Entregas Pendentes</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {deliveries.length > 0 ? (
        <ul>
          {deliveries.map((delivery) => (
            <li key={delivery._id}>
              <p>Entrega ID: {delivery.idEntrega}</p>
              <p>Produto: {delivery.descricao}</p>
              <p>Status: {delivery.status}</p>
              <p>Data de Entrega: {new Date(delivery.dataPrevista).toLocaleDateString()}</p>
              <button 
                onClick={() => handleConfirm(delivery.idEntrega)} 
                disabled={delivery.status === 'Confirmada'}
              >
                Confirmar Entrega
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
      <button onClick={handleBack} className="btn-back">Sair</button>
    </div>
  );
};

export default Cliente;
