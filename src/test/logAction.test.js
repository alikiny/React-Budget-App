import React from 'react'
import {LogIn} from '../routers/LogIn'
import {shallow} from 'enzyme'
import SignUp from '../routers/SignUp'
import {Header} from '../routers/Header'

test('should render log in on click',()=>{
    const logInSpy=jest.fn()
    const wrapper = shallow(<LogIn loginAction={logInSpy}/>)
    wrapper.find('#google-login').simulate('click')
    expect(logInSpy).toHaveBeenCalled()
})

test('should render log out on click',()=>{
    const logOutSpy=jest.fn()
    const wrapper = shallow(<Header logoutAction={logOutSpy}/>)
    wrapper.find('button').simulate('click')
    expect(logOutSpy).toHaveBeenCalled()
})

test('should render sign up on click',()=>{
    const spy=jest.fn()
    const wrapper = shallow(<SignUp signUpAction={spy}/>)
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
})
