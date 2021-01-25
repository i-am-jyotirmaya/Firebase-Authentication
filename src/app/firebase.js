import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { createUserObject } from './schemas';

const firebaseConfig = {
    apiKey: window.env.API_KEY,
    authDomain: window.env.AUTH_DOMAIN,
    databaseURL: window.env.DB_URL,
    projectId: window.env.PROJECT_ID,
    storageBucket: window.env.STORAGE_BUCKET,
    messagingSenderId: window.env.MESSAGING_SENDER_ID,
    appId: window.env.APP_ID
}

const Firebase = firebase.initializeApp(firebaseConfig);
Firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export default Firebase;
// console.log(firebase.database.name);
const Ui = new firebaseui.auth.AuthUI(Firebase.auth());

const createUser = (email, password, onSuccess = undefined, onFail = undefined) => {
    Firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
        console.log(Firebase.auth().currentUser);
        // addUserRecord(name, value.user.email);
        // Firebase.auth().currentUser.updateProfile({
        //     displayName: name,
        // }).then(() => {
        //     console.log('Name Added');
        // })
        onSuccess();
    }, (reason) => {
        console.log(reason);
        onFail(reason);
    })
    .catch(err => console.log(err));
    console.log('adding name')
    
}

const addUserRecord = (uid, name, email) => {
    console.log(Firebase.database.name);
    console.log('Adding User Record');
    let user = createUserObject(name, email);
    console.log(user);
    let newRef = Firebase.database().ref('users').child(uid);
    newRef.set(user, (res) => {
        console.log(res);
    }).then((value) => {
        console.log(value);
    });
}

// const removeUserRecord = (uid) => {
//     Firebase.database().ref('users').child(uid).remove((err) => {
//         if(err) console.log(err);
//     });
// }

const loginUser = (email, password, onSuccess = undefined, onFail = undefined) => {
    Firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
        console.log(value);
        onSuccess && onSuccess();
    }, (reason) => {
        console.log(reason);
        onFail && onFail();
    })
}

const endSession = () => {
    console.log('Signing out');
    Firebase.auth().signOut();
}

const checkAuth = () => {
    return Firebase.auth().currentUser;
}

export {createUser, addUserRecord, Ui, loginUser, checkAuth, endSession};
// const updateUserRecord = (userId, name, isAdmin) => {
//     let updates = {}
//     updates['/users/'+userId+'/name'] = name; 
//     updates['/users/'+userId+'/isAdmin'] = isAdmin; 

//     Firebase.database().ref().update(updates, (res) => {
//         console.log(res);
//     });
// }

// const makeUserAdmin = (userId) => {
//     let update = {};
//     update['/users/' + userId + '/isAdmin'] = true;

//     Firebase.database().ref().update(update, (res) => {
//         console.log(res);
//     });
// }