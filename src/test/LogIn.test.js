import React from 'react'
import {LogIn} from '../routers/LogIn'
import {shallow} from 'enzyme'

test('LogIn page render correctly',()=>{
    const wrapper=shallow(<LogIn loginAction={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})