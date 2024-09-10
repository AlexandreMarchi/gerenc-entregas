# Projeto de Sistema de Gerenciamento de Entregas

## Instalação

1. **Pré-requisitos**

   - Certifique-se de ter o Node.js e npm instalados em sua máquina. Você pode verificar suas instalações com:

     ```bash
     node -v
     npm -v
     ```

2. **Clonar o Repositório**

   - Clone o projeto em sua máquina local:

     ```bash
     git clone https://github.com/AlexandreMarchi/gerenc-entregas
     cd delivery-management-system
     ```

3. **Instalar Dependências**

   - Execute o seguinte comando para instalar todas as dependências listadas no `package.json`:

     ```bash
     npm install
     ```

4. **Executar o Projeto**

   - Inicie o servidor com:

     ```bash
     npm start
     ```
     
5. **Acesso**

   - Acesse o sistema através do navegador em `http://localhost:3000`.

## Dependências

- **Backend**
  - `express`: ^4.17.1
  - `mongoose`: ^5.10.9
  - `bcrypt`: ^5.0.1
  - `jsonwebtoken`: ^8.5.1
  - `dotenv`: ^8.2.0
  - `cors`: ^2.8.5

- **Frontend**
  - `@testing-library/jest-dom`: ^5.17.0
  - `@testing-library/react`: ^13.4.0
  - `@testing-library/user-event`: ^13.5.0
  - `axios`: ^1.7.3
  - `react`: ^18.3.1
  - `react-dom`: ^18.3.1
  - `react-router-dom`: ^6.26.1
  - `react-scripts`: 5.0.1
  - `web-vitals`: ^2.1.4

# Padrões de Projeto no Projeto

## Arquivo: `models/user.js`

O arquivo `models/user.js` define o modelo `User` utilizando Mongoose para o gerenciamento de usuários no banco de dados. Vários padrões de projeto são aplicados neste arquivo para garantir uma estrutura de código eficiente e reutilizável.

### 1. Padrão Singleton

**Descrição**: O padrão Singleton assegura que exista uma única instância de um objeto, o que é essencial para garantir a consistência das operações.

**Implementação**: No Mongoose, o modelo `User` é exportado como uma única instância através do comando `mongoose.model('User', UserSchema)`. Isso garante que todas as operações relacionadas ao usuário utilizem a mesma definição de esquema e instância.

**Código**:
```javascript
module.exports = mongoose.model('User', UserSchema);
