import {
    addExpense,
    removeExpense,
    startAddAction,
    setExpensesAction,
    expensesReducer,
    startEditExpense,
    startRemoveAction
} from '../redux/expenses';
import expenses from './expensesTest'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { firebase } from '../firebase/firebase'

const createMockStore = configureMockStore([thunk])
const uid="testuid"

beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt }
    })

    firebase.database().ref(`user/${uid}/expenses`).set(expenseData).then(() => {
        done()
    })
})

test('set expenses action', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses
    }

    const state = expensesReducer([], action)
    expect(state).toEqual(expenses)

})

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
    const store = createMockStore({auth:{uid}})
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

            return firebase.database().ref(`user/${uid}/expenses/${action[0].expense.id}`).once('value')
        }).then(snapshot => {
            expect(snapshot.val()).toEqual(expense)
        })

})

test('Should fetch expenses from firebase', (done) => {
    const store = createMockStore({auth:{uid}})
    store.dispatch(setExpensesAction()).then(() => {
        const actions = store.getActions()
        console.log('fetch database')
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })

        done()
    })

})

test('Should update expenses in firebase', (done) => {
    const store = createMockStore({auth:{uid}})

    const update = {
        description: 'Monthly rent',
        amount: 650,
    }
    const id = '001'

    store.dispatch(startEditExpense(id, update)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            expense: {
                id,
                update
            }
        })

        firebase.database().ref(`user/${uid}/expenses/${id}`)
            .once('value').then(snapshot => {
                expect(snapshot.val()).toEqual({
                    description: 'Monthly rent',
                    amount: 650,
                    note: 'House rent',
                    createdAt: 4
                })
                done()
            })
    })
})

test('Should delete expenses in firebase', (done) => {
    const store = createMockStore({auth:{uid}})
    const id = '001'
    store.dispatch(startRemoveAction(id)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            expense: {
                id
            }
        })

        firebase.database().ref(`user/${uid}/expenses/${id}`).once('value').then(
            snapshot=>{
                expect(snapshot.val()).toBeFalsy()
                done()
            }
        )
    })
})