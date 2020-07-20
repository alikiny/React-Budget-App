import { datetFilter, sortFilter, textFilter } from '../redux/filters'

test('Should generate date filter object', () => {
    const action = datetFilter(0, 1)
    expect(action).toEqual({
        type: 'DATE_FILTER',
        startDate: 0,
        endDate: 1
    })
})

test('Should generate softFilter', () => {
    const action = sortFilter('date')
    expect(action).toEqual({
        type: 'SORT_FILTER',
        value:'date'
    })
})

test('Should generate text filter',()=>{
    const action = textFilter('rent')
    expect(action).toEqual({
        type: 'TEXT_FILTER',
        value:'rent'
    })
})
