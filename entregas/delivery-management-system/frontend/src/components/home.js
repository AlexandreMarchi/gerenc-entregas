import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Arquivo CSS para estilização

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Sistema de Entregas</h1>
      <div className="home-buttons">
        <Link to="/login">
          <button className="home-button">Fazer Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Registrar-se</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
