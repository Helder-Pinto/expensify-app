import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add expense", () => {
  const anotherExpense = {
    id: "4",
    description: "clothes",
    note: "",
    amount: 500,
    createdAt: 0,
  };
  const action = {
    type: "ADD_EXPENSE",
    expense: anotherExpense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, anotherExpense]);
});

test("should edit an expense", () => {
  const description = "edited expense";

  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      description,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe(description);
});
test("should not edit an expense if id not found", () => {
  const description = "edited expense";

  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      description,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(state);
});
