import { firebase } from './firebase'

var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://thenycode-budget.herokuapp.com/',
    // This must be true.
    handleCodeInApp: true
};

export const createUser = (
    email,
    password,
    displayName = "Anynomous",
    phoneNumber = "",
    photoURL = ""
) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.updateProfile({
                displayName,
                photoURL
            })
        })
        .then(async() => {
            await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            console.log(firebase.auth().currentUser)
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code + " " + error.message)
        })
}

