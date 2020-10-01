import React, { useContext } from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import {UserContext} from "../../App";



import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext( UserContext );
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    
   

      const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
           
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email}
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn} >G0ogle sign In</button>
        </div>
    );
};

export default Login;