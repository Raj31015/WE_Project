import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const { expenses, getExpenses, deleteExpense, loading } = useContext(GlobalContext);

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate total expenses
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Expenses</h5>
              <h2 className="display-4">${totalAmount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Expenses by Category</h5>
            </div>
            <div className="card-body">
              {Object.keys(expensesByCategory).length > 0 ? (
                <div className="row">
                  {Object.entries(expensesByCategory).map(([category, amount]) => (
                    <div className="col-md-3 mb-3" key={category}>
                      <div className="card text-center h-100">
                        <div className="card-body">
                          <h5 className="card-title">{category}</h5>
                          <p className="card-text">${amount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No expenses recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Expenses</h5>
              <Link to="/add" className="btn btn-primary btn-sm">Add New</Link>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Loading expenses...</p>
              ) : (
                <>
                  {expenses.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map(expense => (
                            <tr key={expense._id}>
                              <td>{expense.title}</td>
                              <td>${expense.amount.toFixed(2)}</td>
                              <td>{expense.category}</td>
                              <td>{formatDate(expense.date)}</td>
                              <td>
                                <Link to={`/edit/${expense._id}`} className="btn btn-sm btn-info me-2">
                                  <FaEdit />
                                </Link>
                                <button 
                                  onClick={() => deleteExpense(expense._id)} 
                                  className="btn btn-sm btn-danger"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No expenses found. Add some expenses to get started!</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 