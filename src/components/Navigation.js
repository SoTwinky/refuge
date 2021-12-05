import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import { NavLink } from "react-router-dom";
import firebase from "../utils/firebaseConfig";

const Navigation = () => {
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
        <div className="navigation">
            <NavLink exact to="/refuges" activeClassName="nav-active">
                Tous les refuges
            </NavLink>
            <NavLink exact to="/pets" activeClassName="nav-active">
                Tous les chiens
            </NavLink>
            <NavLink exact to="/news" activeClassName="nav-active">
                Le projet
            </NavLink>
            <NavLink exact to="/about" activeClassName="nav-active">
                Nous soutenir
            </NavLink>
            {isSignedIn ? (
                <NavLink exact to="/profil" activeClassName="nav-active">
                    <span>{firebase.auth().currentUser.displayName}</span>
                </NavLink>
            ) : (
                <NavLink exact to="/login" activeClassName="nav-active">
                    <span>Me connecter</span>
                </NavLink>
            )}
        </div>
    );
};

export default Navigation;