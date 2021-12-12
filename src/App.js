import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";
import firebase from "./utils/firebaseConfig";
import Pets from "./pages/Pets/Pets";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Refuges from "./pages/Refuges/Refuges";
import Refuge from "./pages/Refuges/Refuge";
import Pet from "./pages/Pets/Pet";
import Profil from "./pages/Profil";
import Login from "./pages/Login";


const App = () => {
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
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/refuges">
                    <Refuges/>
                </Route>
                <Route exact path="/refuge/:url">
                    <Refuge/>
                </Route>
                <Route exact path="/refuge/:url/:niv">
                    <Refuge/>
                </Route>
                <Route exact path="/pet/:_id">
                    <Pet/>
                </Route>
                <Route exact path="/pets">
                    <Pets/>
                </Route>
                <Route exact path="/news">
                    <News/>
                </Route>
                <Route exact path="/about">
                    <About/>
                </Route>
                <Route exact path="/login">
                    {isSignedIn ? (
                        <Redirect to="/profil" />
                    ) : (
                        <Login/>
                    )}
                </Route>
                <Route exact path="/profil">
                    {isSignedIn ? (
                        <Profil/>
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
