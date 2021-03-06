import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }
    //Auth functions
    createUserWithEmailAndPassword = (email, password, display) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);


    signInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    signInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    signOutUser = () => this.auth.signOut()

    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    passwordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    profileUpdate = username => {
        this.auth.currentUser.updateProfile({ displayName: username }).then(function() {
            console.log('yes', username);
        }).catch(function(error) {
            console.log('error', error);
        })
    }

}

export default Firebase;
