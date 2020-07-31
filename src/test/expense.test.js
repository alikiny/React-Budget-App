import { addExpense, removeExpense, startAddAction } from '../redux/expenses';
import expenses from './expensesTest'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {firebase} from '../firebase/firebase'

const createMockStore = configureMockStore([thunk])

test('Remove item', () => {
    const remove = removeExpense('dgfe647')
    expect(remove).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: 'dgfe647'
        }
    })
})

test('Add expense', () => {
    const add = addExpense(expenses[1])
    expect(add).toEqual({
        type: 'ADD_EXPENSES',
        expense: expenses[1]
    })
})

test('Add expense to database', () => {
    const expense = {
        description: 'House rent',
        note: 'House rent',
        amount: 550,
        createdAt: 4
    }
    const store = createMockStore({})
    return store.dispatch(startAddAction(expense))
    .then(() => {
        const action = store.getActions()
        expect(action[0]).toEqual(
            {
                type: 'ADD_EXPENSES',
                expense: {
                    id: expect.any(String),
                    ...expense,
                },
            }
        )

        return firebase.database().ref(`expenses/${action[0].expense.id}`).once('value')
    }).then(snapshot=>{
        expect(snapshot.val()).toEqual(expense)
    })

})