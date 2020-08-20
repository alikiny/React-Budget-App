import React from 'react'
import { firebase } from '../firebase/firebase'

const ProfileInfo = () => {
    const user = firebase.auth().currentUser
  
    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-center">
                <img src={user.photoURL} height="70"></img>
                <h1 className="ml-2 mb-5">{user.displayName}</h1>
            </div>


            <div className="row w-50 m-auto">
                <div className="col-md-6 d-flex flex-column">
                    <p>Display name</p>
                    <p>Email</p>
                </div>

                <div className="col-md-6 d-flex flex-column">
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo