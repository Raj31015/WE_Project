import React, { useState, useEffect, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  Snackbar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { getExpenses, addExpense, updateExpense, deleteExpense } from './services/expenseService';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  const fetchExpenses = useCallback(async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
      
      // Calculate total expenses
      const total = data.reduce((sum, expense) => sum + expense.amount, 0);
      setTotalExpenses(total);
      
      // Calculate category totals
      const categoryTotals = data.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {});
      setCategoryTotals(categoryTotals);
    } catch (error) {
      showNotification('Failed to fetch expenses', 'error');
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSubmit = async (formData) => {
    try {
      if (editingExpense) {
        const updated = await updateExpense(editingExpense._id, formData);
        setExpenses(expenses.map(exp => exp._id === editingExpense._id ? updated : exp));
        setEditingExpense(null);
        showNotification('Expense updated successfully', 'success');
      } else {
        const newExpense = await addExpense(formData);
        setExpenses([...expenses, newExpense]);
        showNotification('Expense added successfully', 'success');
      }
      fetchExpenses(); // Refresh totals
    } catch (error) {
      showNotification('Operation failed', 'error');
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense._id !== id));
      showNotification('Expense deleted successfully', 'success');
      fetchExpenses(); // Refresh totals
    } catch (error) {
      showNotification('Failed to delete expense', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Expense Tracker
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" color="primary">
                    ${totalExpenses.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
              
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Category Breakdown
                </Typography>
                {Object.entries(categoryTotals).map(([category, total]) => (
                  <Box key={category} sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {category}
                    </Typography>
                    <Typography variant="body1">
                      ${total.toFixed(2)}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <ExpenseForm onSubmit={handleSubmit} initialData={editingExpense} />
              
              <Typography variant="h5" component="h2" gutterBottom>
                Expenses
              </Typography>
              
              <ExpenseList
                expenses={expenses}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </Grid>
          </Grid>

          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity={notification.severity}
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 