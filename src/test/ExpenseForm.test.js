import ShallowRenderer from 'react-test-renderer/shallow'
import React from 'react'

import { ExpenseModal } from '../routers/ExpenseForm'
import expenses from './expensesTest'
import { shallow, mount } from 'enzyme'

beforeEach(() => {
    //Mock the new Date(Date.now()) function, which is used in ExpenseForm
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date('2019-05-14T11:01:58.135Z').valueOf()
    )
})


test('Render Expense Form', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<ExpenseModal expenses={expenses} openModal={true} />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('Render Edit Form', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<ExpenseModal
        openModal={true}
        expenses={expenses}
        expense={
            {
                id: '004',
                description: 'Phone bill',
                note: 'Phone',
                amount: 50,
                createdAt: 1
            }
        }
    />)
    expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test('Check if text update', () => {
    const value = 'My test name'
    const wrapper = shallow(<ExpenseModal openModal={true} />)

    wrapper.find('#item-name').simulate('change', {
        target: { value: value }
    })

    //wrapper.props() returns all the values under node root
    //items are the extract of all the fileds inside Modal
    const props = wrapper.props()
    const items = props.children.props.children

    //items[0] is the first TextFiels, locate the name value
    const item = items[0]
    expect(item.props.value).toBe(value)
    expect(wrapper).toMatchSnapshot()

})

test('Check if date update', () => {
    const value = 'Mon Jul 20 2020 12:34:26 GMT+0300 (Eastern European Summer Time)'
    const wrapper = shallow(<ExpenseModal openModal={true} />)

    wrapper.find('#item-date').simulate('change', value)

    const props = wrapper.props()
    const items = props.children.props.children

    //items[2] is the date
    const item = items[2].props.children.props.value
    expect(item).toBe(value)
    expect(wrapper).toMatchSnapshot()

})
