import React, {useState, useEffect} from "react";
import firebase from "../utils/firebaseConfig";
import {Redirect, Route} from "react-router-dom";
import Header from "../core/Header";
import Log from "../components/Log";

const Profil = ({isSignedIn}) => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [isSuperAdmin, setIsSuperAdmin] = useState(true);
    return (
        <div id="document" className="profil">
            <Header/>
            <div class="innerCenter">
                <h1>React Crud</h1>
                <h4>Bonjour {firebase.auth().currentUser.displayName}</h4>
                {isAdmin && <a href="admin">Administrateur</a>}
                {isSuperAdmin && <a href="admin">Administrateur</a>}
                <div onClick={() => firebase.auth().signOut()}>Se déconnecter</div>
            </div>
        </div>
    );
};

export default Profil;