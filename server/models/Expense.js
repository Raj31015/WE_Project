const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [50, 'Title cannot be more than 50 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Housing', 'Healthcare', 'Personal', 'Education', 'Other']
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Expense', ExpenseSchema); 