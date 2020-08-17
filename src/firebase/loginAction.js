import {firebase,googleAuthProvider} from './firebase'

export const loginAction=()=>{
    return ()=>{
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}