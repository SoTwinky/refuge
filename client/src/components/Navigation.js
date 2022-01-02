import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import {NavLink} from "react-router-dom";
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
        <ul className="navigation">
            <li>
                <NavLink exact to="/refuges" activeClassName="nav-active">
                    Découvrir les refuges
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/pets" activeClassName="nav-active">
                    Trouver votre animal
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/news" activeClassName="nav-active">
                    La fondation
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/about" activeClassName="nav-active">
                    Nous soutenir
                </NavLink>
            </li>
            <li>
                {isSignedIn ? (
                    <NavLink exact to="/profil" className="profil" activeClassName="nav-active">
                        <span>{firebase.auth().currentUser.displayName}</span>
                    </NavLink>
                ) : (
                    <NavLink exact to="/login" className="profil" activeClassName="nav-active">
                        <span>Me connecter</span>
                    </NavLink>
                )}
            </li>
        </ul>
    );
};

export default Navigation;