import ShallowRenderer from 'react-test-renderer/shallow'
import React from 'react'
import Header from '../routers/Header'
import {shallow} from 'enzyme'

// test('Header render correctly',()=>{
//     const renderer=new ShallowRenderer()
//     renderer.render(<Header/>)
//     expect(renderer.getRenderOutput()).toMatchSnapshot()

// })

test('Header render correctly',()=>{
    const wrapper= shallow(<Header/>)
    expect(wrapper).toMatchSnapshot()
})

