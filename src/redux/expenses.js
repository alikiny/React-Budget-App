import { v4 as uuid } from 'uuid';

export const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0 } = {}) => ({
        type: 'ADD_EXPENSES',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt

        }
    })

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
})

export const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    expense: {
        id,
        update
    }
})


const defaultExpenses = []
export const expensesReducer = (state = defaultExpenses, action) => {
    switch (action.type) {
        case 'ADD_EXPENSES':
            return [...state, action.expense]

        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.expense.id)

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.expense.id) {
                    console.log('Editted successfully!')
                    return { ...expense, ...action.expense.update }
                    
                }
                else {
                    
                    return expense
                }
            }
            )

        default:
            return state
    }
}