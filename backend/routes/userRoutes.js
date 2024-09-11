const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    res.status(200).json({ userId: user._id.toString() });
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

// Função auxiliar para extrair o mês e ano de uma data
const getMonthYear = (date) => {
  const d = new Date(date);
  return {
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
};

// Rota para buscar despesas filtradas por mês
router.get('/expenses', async (req, res) => {
  const { month, year, userId } = req.query;

  try {
    const expenses = await Expense.find({
      userId,
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, parseInt(month)] },
          { $eq: [{ $year: '$date' }, parseInt(year)] },
        ],
      },
    });

    const total = expenses.reduce((sum, expense) => sum + expense.totalCost, 0);

    res.json({ total, categories: expenses });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar despesas' });
  }
});

// Rota para buscar renda filtrada por mês
router.get('/income', async (req, res) => {
  const { month, year, userId } = req.query;

  try {
    const income = await Income.find({
      userId,
      $expr: {
        $and: [
          { $eq: [{ $month: '$date' }, parseInt(month)] },
          { $eq: [{ $year: '$date' }, parseInt(year)] },
        ],
      },
    });

    const total = income.reduce((sum, inc) => sum + inc.amount, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar renda' });
  }
});




module.exports = router;
