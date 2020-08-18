import React, { useState } from 'react';
import LChart from './charts'
import { connect } from 'react-redux'
import { getExpenses } from '../redux/selectors'
import moment from 'moment'




//filter new associate array with grouped values of the same day


export const Summary = ({ expenses }) => {
    let data = []
    let associateData = []
    let filteredArray = []

    const startFilter = (dataSet) => {

        dataSet.forEach(d => {
            let sum = 0
            for (let i = 0; i < data.length; i++) {
                if (data[i].time === d.time) {
                    sum += data[i].amount
                }
            }
    
            associateData[d.time] = {
                time: d.time,
                amount: sum
            }
    
        })
    }

    expenses.map(e => {
        let time = new Date(e.createdAt)
        time = moment(time).format("MMMM Do YYYY")
        let expense = {
            description: e.description,
            time,
            amount: e.amount
        }
        data.push(expense)
    })

    startFilter(data)

    //Turn associate array to normal array to use in chart
    for (let d in associateData) {
        filteredArray.push(associateData[d])
    }

    return (
        <div className="container-fluid">
            <LChart data={filteredArray} />
        </div>
    )
}

export default connect((state) => {
    return {
        expenses: getExpenses(state.expenses, state.filters),
    }
})(Summary)