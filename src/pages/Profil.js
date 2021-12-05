import React from "react";
import firebase from "../utils/firebaseConfig";
import {Redirect, Route} from "react-router-dom";
import Header from "../core/Header";

const Profil = () => {
    return (
        <div id="document" className="profil">
            <Header/>
            <div class="innerCenter">
                <h1>React Crud</h1>
                <h4>Bonjour {firebase.auth().currentUser.displayName}</h4>
                <div onClick={() => firebase.auth().signOut()}>Se déconnecter</div>
            </div>
        </div>
    );
};

export default Profil;