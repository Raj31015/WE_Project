// Reducer function that specifies how the state changes in response to actions
export default (state, action) => {
  switch(action.type) {
    case 'GET_EXPENSES':
      return {
        ...state,
        loading: false,
        expenses: action.payload
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload)
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense => 
          expense._id === action.payload._id ? action.payload : expense
        )
      };
    case 'EXPENSE_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}; 