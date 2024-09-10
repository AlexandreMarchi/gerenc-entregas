const mongoose = require('mongoose');
const User = require('../models/user');

beforeAll(async () => {
  
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Model', () => {
  let user;

  beforeEach(() => {
    user = new User({
      name: 'Test User',
      cpf: '12345678901',
      password: 'plainPassword',
      role: 'cliente'
    });
  });

  test('hashPassword should hash the password correctly', async () => {
    const hashedPassword = await user.hashPassword(user.password);
    expect(hashedPassword).not.toBe(user.password);
    expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  test('comparePassword should return true for correct password', async () => {
    const hashedPassword = await user.hashPassword(user.password);
    user.password = hashedPassword;

    const isMatch = await user.comparePassword('plainPassword');
    expect(isMatch).toBe(true);
  });

  test('comparePassword should return false for incorrect password', async () => {
    const hashedPassword = await user.hashPassword(user.password);
    user.password = hashedPassword;

    const isMatch = await user.comparePassword('wrongPassword');
    expect(isMatch).toBe(false);
  });
});
