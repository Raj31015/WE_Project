import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TableSortLabel,
  Box,
  Chip,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (orderBy === 'date') {
      return order === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (orderBy === 'amount') {
      return order === 'asc' 
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
    if (orderBy === 'title') {
      return order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#4caf50',
      Transportation: '#2196f3',
      Entertainment: '#9c27b0',
      Shopping: '#ff9800',
      Utilities: '#607d8b',
      Housing: '#795548',
      Healthcare: '#f44336',
      Personal: '#00bcd4',
      Education: '#673ab7',
      Other: '#9e9e9e'
    };
    return colors[category] || '#9e9e9e';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : 'asc'}
                onClick={() => handleSort('date')}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'title'}
                direction={orderBy === 'title' ? order : 'asc'}
                onClick={() => handleSort('title')}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'amount'}
                direction={orderBy === 'amount' ? order : 'asc'}
                onClick={() => handleSort('amount')}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body1" color="text.secondary">
                  No expenses found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedExpenses.map((expense) => (
              <TableRow 
                key={expense._id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {new Date(expense.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>
                  <Chip
                    label={expense.category}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(expense.category),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      ${expense.amount.toFixed(2)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {expense.description || '-'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton 
                      onClick={() => onEdit(expense)} 
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      onClick={() => onDelete(expense._id)} 
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList; 