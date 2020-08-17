import {firebase,googleAuthProvider} from './firebase'

export const logoutAction=()=>{
    return ()=>{
        return firebase.auth().signOut()
    }
}