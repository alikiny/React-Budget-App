export default (counts)=>{
    if(counts.length==0){
        return 0
    }else{
        const amountArray=counts.map((count)=>count.amount)
        return amountArray.reduce((sum,value)=>sum+value)
    }
}
