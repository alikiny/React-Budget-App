import { firebase, googleAuthProvider } from './firebase'

export const loginAction = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const loginCustom = (email, password) => {
    console.log('log in')
    return () => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(credential => console.log(credential))
            .catch(error => alert(error.message))
    }
}