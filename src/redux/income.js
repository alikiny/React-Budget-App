import { firebase } from '../firebase/firebase'

export const setIncomes = (incomes) => ({
    type: 'SET_INCOMES',
    incomes
})

export const setIcomesAction = () => {
    const incomes = []
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/incomes`)
            .once('value').then(snapshot => {
                snapshot.forEach((income) => {
                    incomes.push({
                        id: income.key,
                        ...income.val()
                    })
                })

                dispatch(setIncomes(incomes))
            })

    }


}

export const addIncome = (income) => ({
    type: 'ADD_INCOME',
    income
})

export const addIncomeAction = (income = {}) => {

    return (dispatch, getState) => {
        const {
            description = 'Income',
            source='Job',
            amount = 0,
            date = 0
        } = income

        const uid = getState().auth.uid
        const newIncome = {description,source,amount,date}
        return firebase.database().ref(`user/${uid}/incomes`).push(newIncome)
            .then((ref) => {
                dispatch(addIncome({
                    id: ref.key,
                    ...newIncome
                }))
            })
    }

}

export const removeIncome = (id) => ({
    type: 'REMOVE_INCOME',
    id
})

export const removeIncomeAction = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/incomes/${id}`)
            .remove().then(() => {
                dispatch(removeIncome(id))
                console.log('remove')
            })
    }
}

export const editIncome = (id, update) => ({
    type: 'EDIT_INCOME',
    income: {
        id,
        update
    }
})

export const editIncomeAction = (id, update) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database().ref(`user/${uid}/incomes/${id}`).update(update).then(() =>
            dispatch(editIncome(id, update))
        )
    }

}


const defaultIncomes = []
export default (state = defaultIncomes, action) => {
    switch (action.type) {
        case 'SET_INCOMES':
            return action.incomes
        case 'ADD_INCOME':
            return [...state, action.income]

        case 'REMOVE_INCOME':
            return state.filter((income) => income.id !== action.id)

        case 'EDIT_INCOME':
            return state.map((income) => {
                if (income.id === action.income.id) {
                    return { ...income, ...action.income.update }

                }
                else {

                    return income
                }
            }
            )

        default:
            return state
    }
}