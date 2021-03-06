import { firebase } from '../firebase/firebase'

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const setExpensesAction = () => {
    const expenses = []
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/expenses`)
            .once('value').then(snapshot => {
                snapshot.forEach((expense) => {
                    expenses.push({
                        id: expense.key,
                        ...expense.val()
                    })
                })

                dispatch(setExpenses(expenses))
            })

    }


}

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSES',
    expense
})

export const startAddAction = (expense = {}) => {

    return (dispatch, getState) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expense

        const uid = getState().auth.uid
        const newExpense = { description, note, amount, createdAt }
        return firebase.database().ref(`user/${uid}/expenses`).push(newExpense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...newExpense
                }))
            })
    }

}

export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
})

export const startRemoveAction = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/expenses/${id}`)
            .remove().then(() => {
                dispatch(removeExpense(id))
            })
    }
}

export const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    expense: {
        id,
        update
    }
})

export const startEditExpense = (id, update) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/expenses/${id}`).update(update).then(() =>
            dispatch(editExpense(id, update))
        )
    }

}


const defaultExpenses = []
export const expensesReducer = (state = defaultExpenses, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.expenses
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