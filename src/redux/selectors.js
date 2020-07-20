import moment from 'moment'

export const getExpenses=(expenses,{text='',startDate=undefined,endDate=undefined,sortBy='date'})=>{
    if(sortBy.toUpperCase()==='DATE'){
        
        expenses.sort((e1,e2)=>{
            return e1.createdAt-e2.createdAt
            
        })
    }else if(sortBy.toUpperCase()==='AMOUNT'){
        console.log('sort by amount')
        expenses.sort((e1,e2)=>{
            return e1.amount-e2.amount
        })
    }
    if(text.trim()!==""){
        expenses=expenses.filter((expense)=>{
            return expense.description.toLowerCase().includes(text.toLowerCase())
        })
    }

    if(startDate&&endDate&&startDate<endDate){
        expenses=expenses.filter((expense)=>{
            return expense.createdAt>=startDate && expense.createdAt<=endDate
        })
    }
    return expenses
        
}