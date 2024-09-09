const mongoose = require('mongoose');

// Modelo de Despesas
const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: Date,
  userId: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

// Modelo de Renda
const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: Date,
  userId: String,
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = { Expense, Income };
