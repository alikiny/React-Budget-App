export const textFilter = (value = '') => ({
    type: 'TEXT_FILTER',
    value
})

export const sortFilter = (value) => ({
    type: 'SORT_FILTER',
    value
})

export const datetFilter = (startDate=undefined,endDate=undefined) => ({
    type: 'DATE_FILTER',
    startDate,
    endDate
})

const defaultFilter = {
    text: '',
    sortBy: 'Date',
    startDate: undefined,
    endDate: undefined,
}

export const filterReducer = (state = defaultFilter, action) => {
    switch (action.type) {
        case 'TEXT_FILTER':
            return {
                ...state,
                text: action.value
            }
        case 'SORT_FILTER':
            return {
                ...state,
                sortBy: action.value
            }
        case 'DATE_FILTER':
            return {
                ...state,
                startDate: action.startDate,
                endDate:action.endDate
            }
        default:
            return state
    }

}