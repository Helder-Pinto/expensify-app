import { createStore, combineReducers, bindActionCreators } from "redux";
import { v4 as uuidv4 } from "uuid";

//ADD EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  },
});

// REMOVE
const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text) => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_AMOUNT
const sortByAmout = () => ({
  type: "SORT_BY_AMOUNT",
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

//Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };

    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        startDate: action.endDate,
      };
    default:
      return state;
  }
};

//timestamps

// Get visisble expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const starDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        text.length === 0 ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return starDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt - b.createdAt;
      } else if (sortBy === "amount") {
        console.log(a.amount < b.amount);
        return a.amount - b.amount;
      }
    });
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();

  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expense1 = store.dispatch(
  addExpense({ description: "Rent", amount: "10000000000", createdAt: -21000 })
);
const expense2 = store.dispatch(
  addExpense({ description: "Savings", amount: "30000000", createdAt: -1000 })
);

// store.dispatch(sortByAmout());
// store.dispatch(removeExpense({ id: expense1.expense.id }));

// store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("SavIngs"));

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

// const demoState = {
//   expenses: [
//     {
//       id: "vfvvsd",
//       description: "January Rent",
//       note: "This was the final payment for that address",
//       amount: 54500,
//       createdAt: 0,
//     },
//   ],

//   filters: {
//     text: "rent",
//     sortBy: "amount", //date or ammount
//     startDate: undefined,
//     endDate: undefined,
//   },
// };

// const user = {
//   name: "Jen",
//   age: 24,
// };

// console.log({
//   ...user,
//   location: "Philly",
//   age: 27,
// });
