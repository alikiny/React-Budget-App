import {ExpenseList} from '../routers/ExpenseList'
import {shallow} from 'enzyme'
import React from 'react'
import expenses from './expensesTest'

test('Render expenses list',()=>{
    const wrapper=shallow(<ExpenseList expenses={expenses}/>)
    expect(wrapper).toMatchSnapshot()
})

test('Render with empty message',()=>{
    const wrapper=shallow(<ExpenseList expenses={[]} />)
    expect(wrapper).toMatchSnapshot()
})

