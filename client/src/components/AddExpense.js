import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useContext(GlobalContext);
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  // Categories
  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Shopping', 
    'Utilities', 'Housing', 'Healthcare', 'Personal', 'Education', 'Other'
  ];
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !amount || !category) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number');
      return;
    }
    
    const newExpense = {
      title,
      amount: +amount,
      category,
      date: date ? new Date(date) : new Date(),
      description
    };
    
    addExpense(newExpense);
    
    // Reset form and navigate to dashboard
    navigate('/');
  };
  
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Add New Expense</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title *</label>
            <input 
              type="text" 
              className="form-control" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter expense title"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount ($) *</label>
            <input 
              type="number" 
              className="form-control" 
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category *</label>
            <select 
              className="form-select" 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input 
              type="date" 
              className="form-control" 
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <small className="form-text text-muted">
              If not provided, current date will be used
            </small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Enter a description (optional)"
            ></textarea>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense; 