import React, { useState } from 'react';
import AccountInfo from '../dashboard-component/AccountInfo'
import ProfileInfo from '../dashboard-component/ProfileInfo'
import SavingInfo from '../dashboard-component/SavingInfo'
import SettingInfo from '../dashboard-component/SettingInfo'
import { connect } from 'react-redux';



export const Dashboard = (props) => {

    const navigateComponent = (componentName) => {

    }

    const [DynamicComponent, setComponent] = useState(<ProfileInfo/>)

    const onChangeDynamicComponent = (option) => {
        switch (option) {
            case 'profile':
                setComponent(<ProfileInfo/>);
                break;
            case 'setting':
                setComponent(<SettingInfo/>);
                break;
            case 'account':
                setComponent(<AccountInfo/>);
                break;
            case 'saving':
                setComponent(<SavingInfo/>);
                break;
            default:
                setComponent(<AccountInfo/>);
        }
    }

    return (
        <div className="container-fluid mt-5">
            <div className='row'>

                <div className="col-sm-4">
                    <ul className="list-group list-group-flush">
                        <li 
                        className="navigataion-bar list-group-item"
                        onClick={()=>onChangeDynamicComponent('profile')} >Profile</li>
                        <li 
                        className="navigataion-bar list-group-item"
                        onClick={()=>onChangeDynamicComponent('setting')}>Setting</li>
                        <li 
                        className="navigataion-bar list-group-item"
                        onClick={()=>onChangeDynamicComponent('account')}>Current account</li>
                        <li className="navigataion-bar list-group-item"
                        onClick={()=>onChangeDynamicComponent('saving')}>Saving goal</li>
                    </ul>
                </div>

                <div className="col-sm-8">
                    {DynamicComponent}
                </div>

            </div>
        </div>

    )
}


export default connect(state => ({
    expenses: state.expenses
}))(Dashboard)