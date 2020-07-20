import { addExpense, removeExpense } from '../redux/expenses';

test('Remove item',()=>{
   const remove= removeExpense('dgfe647')
   expect(remove).toEqual({
    type: 'REMOVE_EXPENSE',
    expense: {
        id: 'dgfe647'
    }
   })
})

test('Add expense as default',()=>{
    const add=addExpense()
    expect(add).toEqual({
        type: 'ADD_EXPENSES',
        expense: {
            id:expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0}
    })
})


test('Add new expense test',()=>{
    const add=addExpense({
    
        id:expect.any(String),
        description:'',
        note:'',
        amount:0,
        createdAt:34856439574395

    })
    expect(add).toEqual({
        type: 'ADD_EXPENSES',
        expense: {
            id:expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 34856439574395}
    })
})