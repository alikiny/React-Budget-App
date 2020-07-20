import ShallowRenderer from 'react-test-renderer/shallow'
import React from 'react'
import {FilterExpense} from '../routers/FilterExpense'
import filters from './FilterTest'


test('Render Filter Expense',()=>{
    const renderer=new ShallowRenderer()
   renderer.render(<FilterExpense filters={filters}/>)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
})