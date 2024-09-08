const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const router = express.Router();

//rota cadastro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Cria um novo usuário
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Responde com sucesso
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    // Se tudo estiver correto
    res.status(200).json({ msg: 'Login bem-sucedido' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Servidor com erro');
  }
});

// Rota despesa
router.post('/add', async (req, res) => {
  const { userId, date, totalCost, description, category } = req.body;

  try {
    const newExpense = new Expense({
      userId,
      date,
      totalCost,
      description,
      category,
    });

    await newExpense.save();
    res.status(201).json({ msg: 'Despesa registrada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota renda
router.post('/incomes/add', async (req, res) => {
  const { userId, date, amount, description, category } = req.body;

  try {
    const newIncome = new Income({
      userId,
      date,
      amount,
      description,
      category,
    });

    await newIncome.save();
    res.status(201).json({ msg: 'Renda registrada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
