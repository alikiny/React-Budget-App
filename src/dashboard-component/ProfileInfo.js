import React from 'react'
import { firebase } from '../firebase/firebase'

const ProfileInfo = () => {
    const user = firebase.auth().currentUser
    console.log(user)
    return (
        <div>
            <h1 className="text-center">{user.displayName}</h1>
            <div></div>
        </div>
    )
}

export default ProfileInfo