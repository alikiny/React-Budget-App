import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateGoalAction, addToSavingAction } from '../redux/saving'
import totalCount from '../redux/total-count'

const SavingInfo = ({ saving, setNewGoal, addToSaving ,incomes,expenses}) => {

    const currentBalance=totalCount(incomes)-totalCount(expenses)
    const residualAmount=currentBalance-saving.actual
    const progress = saving.goal > 0 ? saving.actual / saving.goal : 0

    const [goal, setGoal] = useState(saving.goal ? saving.goal : 0)
    const [amountToAdd, setAmountToAdd] = useState(0)

    const setSavingGoal = (e) => {
        e.preventDefault()
        setNewGoal(goal)

    }

    const addSavingAmount = (e) => {
        e.preventDefault()

        if(amountToAdd<=residualAmount){
            addToSaving(amountToAdd)
            setAmountToAdd(0)
        }else{
            alert("Amount to add cannot exceed your residual amount")
            setAmountToAdd(0)
        }
       
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-4">
                    <p>Current balance</p>
                    <p>Saving goal </p>
                    <p>Actual saving</p>
                    <p>Residual amount</p>
                    <p>Progress</p>
                </div>
                <div className="col-md-8">
                    <p>{currentBalance}</p>
                    <p>{saving.goal}</p>
                    <p>{saving.actual}</p>
                    <p>{residualAmount}</p>
                    <p>{progress * 100}%</p>
                </div>

            </div>

            <form >
                <div className="form-group row">
                    <label className="col-md-4" htmlFor="saving-goal">New saving goal</label>

                    <input
                        className="form-control col-md-6"
                        id="saving-goal"
                        type="number"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}></input>

                    <button className="btn btn-success col-md-2" onClick={setSavingGoal} >Save</button>
                </div>

                <div className="form-group row">
                    <label className="col-md-4" htmlFor="add-saving">Add amount to saving </label>

                    <input
                        className="form-control col-md-6"
                        id="add-saving"
                        type="number"
                        value={amountToAdd}
                        onChange={(e) => setAmountToAdd(e.target.value)}></input>

                    <button className="btn btn-success col-md-2" onClick={addSavingAmount}>Add</button>
                </div>
            </form>


        </div>

    )
}

const mapStateToProps = state => ({
    saving: state.saving,
    incomes:state.incomes,
    expenses:state.expenses,

})

const mapDispatchToProps = dispatch => ({
    setNewGoal: (goal) => dispatch(updateGoalAction(goal)),
    addToSaving: (amount) => dispatch(addToSavingAction(amount))
})

export default connect(mapStateToProps, mapDispatchToProps)(SavingInfo)