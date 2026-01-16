const User = require('../models/User');

const register = (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  // Validações
  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'As senhas não correspondem' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  // Criar usuário
  User.create(name, email, password, (err, user) => {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
      return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }

    const token = User.generateToken(user.id);
    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Validações
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // Buscar usuário
  User.findByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar senha
    if (!User.verifyPassword(password, user.password)) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token
    const token = User.generateToken(user.id);
    return res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
};

const getProfile = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json({ user });
  });
};

module.exports = {
  register,
  login,
  getProfile
};
