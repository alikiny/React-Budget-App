import React from 'react'
import SignUp from '../routers/SignUp'
import {shallow} from 'enzyme'

test('LogIn page render corrently',()=>{
    const wrapper=shallow(<SignUp signUpAction={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})