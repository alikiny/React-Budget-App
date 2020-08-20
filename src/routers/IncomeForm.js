import React,{useState} from 'react'
import { connect } from 'react-redux'
import { addIncomeAction, editIncomeAction,removeIncomeAction } from '../redux/income'

export const IncomeForm = ({addIncome,editIncome}) => {

    const [incomeName, setName]=useState("")
    const [amount, setAmount]= useState(0)
    const [source, setSource] =useState("Job")
    const [date,setDate]=useState(Date.now())

    const onAddIncome = (e) => {
        e.preventDefault()
        const newIncome={
            description: incomeName,
            amount: parseFloat(amount),
            source: source,
            date: (new Date(date)).getTime()
        }

        addIncome(newIncome).then(
            ()=>{
                setName("")
                setAmount(0)
                setSource("Job")
                setDate(Date.now())
            }
        )
    }


    const onEditIncome=(e)=>{
        e.preventDefault()
    }

    return (
        <form className="p-5 m-auto w-50">
            <div className="form-group row">
                <label className="col-md-6">New income</label>
                <input 
                className="col-md-6 form-control" 
                placeholder="Description"
                value={incomeName}
                onChange={(e)=>setName(e.target.value)}></input>
            </div>

            <div className="form-group row">
                <label className="col-md-6">Amount</label>
                <input 
                className="col-md-6 form-control" 
                placeholder="Amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}></input>
            </div>

            <div className="form-group row">
                <label className="col-md-6">Source</label>
                <select className="col-md-6 form-control"
                value={source}
                onChange={(e)=>setSource(e.target.value)}>

                    <option>Job</option>
                    <option>Business</option>
                    <option>Freelance</option>
                    <option>Rent</option>
                    <option>Interest</option>
                    <option>Other</option>

                </select>
            </div>

            <div className="form-group row">
                <label className="col-md-6">Date</label>
                <input 
                type="date" 
                className="col-md-6 form-control"
                value={date}
                onChange={(e)=>setDate(e.target.value)}></input>
            </div>

            <div className="form-group">
                <button className="m-auto btn btn-success" onClick={onAddIncome}>Add</button>
            </div>
        </form>
    )
}

const mapDispatchToProps=dispatch=>({
    addIncome: (income) => dispatch(addIncomeAction(income)),
    editIncome: (id, update) => dispatch(editIncomeAction(id, update)),
})



export default connect(undefined,mapDispatchToProps)(IncomeForm)