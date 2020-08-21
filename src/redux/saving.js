import { firebase } from '../firebase/firebase'

const setAccount = (goal, actual) => ({
    type: 'SET_ACCOUNT',
    goal: goal,
    actual: actual
})

const updateGoal = (goal) => ({
    type: 'UPDATE_GOAL',
    goal: goal
})

const addToSaving = (actualAmount) => ({
    type: 'ADD_TO_SAVING',
    amount: actualAmount
})

export const addToSavingAction = (amount) => {


    return (dispatch, getState) => {
        const actualSaving = getState().saving.actual + parseFloat(amount)
        const uid = getState().auth.uid
        return firebase.database()
            .ref(`user/${uid}/saving`)
            .update({ actual: actualSaving })
            .then(() => {
                dispatch(addToSaving(actualSaving))
            })
    }
}

export const setAccountAction = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database()
            .ref(`user/${uid}/saving`)
            .once('value')
            .then(snapshot => {
                dispatch(setAccount(
                    snapshot.val()? snapshot.val().goal : 0,
                    snapshot.val()? snapshot.val().actual : 0
                )
                )
            })
    }
}


export const updateGoalAction = (goal) => {
    const update={goal:parseFloat(goal)}
    return(dispatch, getState) => {
        const uid = getState().auth.uid
        return firebase.database()
        .ref(`user/${uid}/saving`)
        .update(update)
        .then(() =>
            dispatch(updateGoal(goal))
        )
    }
}

const savingGoalReducer = (state = { goal: 0, actual: 0 }, action) => {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...state, goal: action.goal, actual: action.actual }
        case 'UPDATE_GOAL':
            return { ...state, goal: action.goal }
        case 'ADD_TO_SAVING':
            return { ...state, actual: action.amount }
        default:
            return state
    }
}

export default savingGoalReducer