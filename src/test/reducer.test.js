import { expensesReducer } from '../redux/expenses'

import { filterReducer } from '../redux/filters'
import { bindActionCreators } from 'redux'

const currentFilter = {
    text: 'bill',
    sortBy: 'Date',
    startDate: undefined,
    endDate: undefined,
}

const expense1 = { id: '005', description: 'Hotel rent', note: 'Trip', amount: 370, createdAt: 0 }
const update = { amount: 180 }


const currentExpense = [
    { id: '001', description: 'House rent', note: 'House rent', amount: 550, createdAt: 4 },

    { id: '002', description: 'Electric bill', note: 'Electric bill', amount: 120, createdAt: 3 },

    { id: '003', description: 'Water bill', note: 'Water bill', amount: 150, createdAt: 2 },

    { id: '004', description: 'Food', note: 'Food', amount: 450, createdAt: 1 },


]

test('Filter default value', () => {
    const state = filterReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        text: '',
        sortBy: 'Date',
        startDate: undefined,
        endDate: undefined,
    })
})

test('Set up sortBy filter', () => {
    const state = filterReducer(undefined, { type: 'SORT_FILTER', value: 'amount' })
    expect(state.sortBy).toEqual('amount')

})

test('Set up text filter', () => {
    const state = filterReducer(currentFilter, { type: 'TEXT_FILTER', value: 'rent' })
    expect(state.text).toEqual('rent')

})

test('Expense default value', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('Add expense', () => {
    const state = expensesReducer(currentExpense, { type: 'ADD_EXPENSES', expense: expense1 })
    expect(state).toEqual([...currentExpense, expense1])
}
)

test('Modify Expense', () => {
    const state = expensesReducer(currentExpense, {
        type: 'EDIT_EXPENSE',
        expense: {
            id: '003',
            update: update
        }
    })

    expect(state[2]).toEqual({...currentExpense[2],...update})

})

test('Remove expense',()=>{
    const state=expensesReducer(currentExpense,{type:'REMOVE_EXPENSE',expense:{id:'005'}})
    expect(state).toEqual(
        currentExpense.filter((expense)=>expense.id!=='005')
    )
})

