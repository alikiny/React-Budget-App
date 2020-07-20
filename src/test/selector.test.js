import {getExpenses} from '../redux/selectors'

const expenses=[
    { id:'001',description: 'House rent',note: 'House rent',amount: 550,createdAt: 4},
    
    {id:'002',description: 'Electric bill',note: 'Electric bill',amount: 120,createdAt: 3},

    {id:'003',description: 'Water bill',note: 'Water bill',amount: 150,createdAt: 2},

    { id:'004',description: 'Food',note: 'Food',amount: 450,createdAt: 1}  ,
    
    { id:'005',description: 'Hotel rent',note: 'Trip', amount: 370,createdAt: 0}
]

const filter1={text:'',startDate:undefined,endDate:undefined,sortBy:'date'}
const filter2={text:'rent',startDate:undefined,endDate:undefined,sortBy:'date'}
const filter4= {text:'',startDate:1,endDate:3,sortBy:'date'}


test('Filter by start and end date',()=>{
    const result=getExpenses(expenses,filter4)
    expect(result).toEqual([expenses[1],expenses[2],expenses[3]])
})

test('Filter by default',()=>{
    const result=getExpenses(expenses,filter1)
    expect(result).toEqual(expenses)
})

test('Filter by text value',()=>{
    const result=getExpenses(expenses,filter2)
    expect(result).toEqual([expenses[0],expenses[4]])
})

