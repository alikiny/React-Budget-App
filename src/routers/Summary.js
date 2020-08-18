import React, { useState } from 'react';
import LChart from './charts'
import { connect } from 'react-redux'
import moment from 'moment'

let data = []
let filteredData = []
let filteredArray=[]

//filter new associate array with grouped values of the same day
const startFilter = (dataSet) => {

    dataSet.forEach(d => {
        let sum = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].time === d.time) {
                sum += data[i].amount
            }
        }

        filteredData[d.time]={
            time: d.time,
            amount: sum
        }

    })
}

export const Summary = ({ expenses }) => {

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
    for (let d in filteredData){
        filteredArray.push(filteredData[d])
    }
    console.log(filteredArray)
  
   

    return (
        <div className="container-fluid">

            <LChart data={filteredArray} />
        </div>
    )
}

const mapStateToProps = state => ({
    expenses: state.expenses
})
export default connect(mapStateToProps)(Summary)