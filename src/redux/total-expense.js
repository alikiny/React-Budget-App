export default (expense)=>{
    if(expense.length==0){
        return 0
    }else{
        const amountArray=expense.map((expense)=>expense.amount)
        return amountArray.reduce((sum,value)=>sum+value,0)
    }
}