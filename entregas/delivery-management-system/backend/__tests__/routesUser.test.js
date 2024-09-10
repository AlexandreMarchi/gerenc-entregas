const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const userRoutes = require('../routes/user'); 

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('POST /register', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        cpf: '12345678901',
        password: 'password123',
        role: 'cliente',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso.');
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        cpf: '12345678901',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Todos os campos são obrigatórios.');
  });
});

describe('POST /login', () => {
  it('should login successfully with correct credentials', async () => {
    // Primeiro registre um usuário
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        cpf: '12345678901',
        password: 'password123',
        role: 'cliente',
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        cpf: '12345678901',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 for incorrect password', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        cpf: '12345678901',
        password: 'password123',
        role: 'cliente',
      });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        cpf: '12345678901',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Senha incorreta.');
  });

  it('should return 400 for non-existent user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        cpf: '00000000000',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuário não encontrado.');
  });
});
