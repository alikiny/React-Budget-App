import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { value } from 'numeral'

const SettingInfo = () => {

    const user = firebase.auth().currentUser
    const [name,setName]=useState(user.displayName)
    const [photo,setPhoto]=useState(user.photoURL?user.photoURL:"")
    
    const onSaveChange = (e) => {
        e.preventDefault()
        user.updateProfile({
            displayName: name,
            photoURL: photo,
        })
        .then(()=>{
            alert('Updated successfully')
        }).catch(e=>{
            alert("Cannot update your information")
            console.log(e)
        })
        
    }

    return (
        <div className="container">
            <form className="row" onSubmit={onSaveChange}>

                <div className="col-md-4">
                    <p>Display name</p>
                    <p>Photo</p>
                </div>

                <div className="col-md-8 d-flex flex-column">
                    <input value={name} onChange={(e)=>setName(e.target.value)} />
                    <input value={photo} onChange={(e)=>setPhoto(e.target.value)} />
                </div>

                <button className="btn btn-success m-auto" type="submit" >Save changes</button>
            </form>
        </div>
    )
}

export default SettingInfo