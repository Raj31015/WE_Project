import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Box, 
  Paper,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Housing',
  'Healthcare',
  'Personal',
  'Education',
  'Other'
];

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    amount: initialData?.amount || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || '',
        description: initialData.description || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({
          title: '',
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        {initialData ? 'Edit Expense' : 'Add New Expense'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          required
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          error={!!errors.amount}
          helperText={errors.amount}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon color="action" />
              </InputAdornment>
            ),
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Tooltip title={initialData ? "Update Expense" : "Add Expense"}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={initialData ? <EditIcon /> : <AddIcon />}
            >
              {initialData ? 'Update' : 'Add'}
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseForm; 