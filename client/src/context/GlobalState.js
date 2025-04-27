import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  expenses: [],
  error: null,
  loading: true
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  // Actions
  async function getExpenses() {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      
      dispatch({
        type: 'GET_EXPENSES',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function addExpense(expense) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    try {
      const res = await axios.post('http://localhost:5000/api/expenses', expense, config);
      
      dispatch({
        type: 'ADD_EXPENSE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function deleteExpense(id) {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  async function updateExpense(id, expense) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    try {
      const res = await axios.put(`http://localhost:5000/api/expenses/${id}`, expense, config);
      
      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error
      });
    }
  }
  
  // Load expenses when component mounts
  useEffect(() => {
    getExpenses();
  }, []);
  
  return (
    <GlobalContext.Provider value={{
      expenses: state.expenses,
      error: state.error,
      loading: state.loading,
      getExpenses,
      addExpense,
      deleteExpense,
      updateExpense
    }}>
      {children}
    </GlobalContext.Provider>
  );
}; 