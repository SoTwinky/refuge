import React, {useEffect, useState} from 'react';
import firebase from "../utils/firebaseConfig";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Header from "../core/Header";

const Login = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false,
        },
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
    }, []);

    return (
        <div id="document" className="login">
            <Header/>
            <h1>React Crud</h1>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};

export default Login;