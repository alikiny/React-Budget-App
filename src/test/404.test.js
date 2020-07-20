import {shallow} from 'enzyme'
import React from 'react'
import NotFound from '../routers/404'

test('Render 404 page',()=>{
    const wrapper=shallow(<NotFound/>)
    expect(wrapper).toMatchSnapshot()
})