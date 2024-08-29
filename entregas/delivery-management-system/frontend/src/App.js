import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Home from './components/home';
import Login from './components/login';
import Entregador from './components/entregador';
import Cliente from './components/cliente';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/entregador" element={<Entregador />} />
        <Route path="/cliente" element={<Cliente />} />
      </Routes>
    </Router>
  );
};

export default App;
