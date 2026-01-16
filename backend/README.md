# Backend - Projeto Valtemir

API REST para autenticação e gerenciamento de usuários.

## Estrutura

```
backend/
├── src/
│   ├── controllers/     # Lógica de negócio
│   ├── middleware/      # Middlewares (autenticação)
│   ├── models/          # Modelos de dados
│   ├── routes/          # Definição de rotas
│   ├── database.js      # Configuração do banco
│   └── server.js        # Servidor principal
├── package.json
├── .env                 # Variáveis de ambiente
└── README.md
```

## Instalação

```bash
cd backend
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O servidor rodará em `http://localhost:5000`

## Produção

```bash
npm start
```

## Endpoints

### Autenticação

#### Registrar
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "João",
  "email": "joao@example.com",
  "password": "senha123",
  "passwordConfirm": "senha123"
}
```

**Response (201):**
```json
{
  "message": "Usuário registrado com sucesso",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@example.com"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@example.com"
  }
}
```

#### Obter Perfil
```
GET /api/auth/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@example.com"
  }
}
```

### Health Check

```
GET /api/health
```

**Response (200):**
```json
{
  "status": "Server rodando",
  "timestamp": "2026-01-16T..."
}
```

## Tecnologias

- **Express**: Framework web
- **SQLite3**: Banco de dados
- **JWT**: Autenticação
- **bcrypt**: Hash de senha
- **CORS**: Controle de origem

## Variáveis de Ambiente

Configure o arquivo `.env`:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_123456
DATABASE=valtemir.db
```

## Licença

ISC
