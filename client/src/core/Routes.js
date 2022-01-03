import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import React from "react";
import Pets from "../pages/Pets/Pets";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Refuges from "../pages/Refuges/Refuges";
import Refuge from "../pages/Refuges/Refuge";
import Pet from "../pages/Pets/Pet";
import Profil from "../pages/Profil";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Header from "./Header";
import Footer from "./Footer";


const Routes = ({uid}) => {
    return (
            <Router>
                <Header/>
                <main id="corps">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/refuges">
                            <Refuges/>
                        </Route>
                        <Route exact path="/refuge/:_id">
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
                            {uid ? (
                                <Redirect to="/profil"/>
                            ) : (
                                <Login/>
                            )}
                        </Route>
                        <Route exact path="/profil">
                            {uid ? (
                                <Profil/>
                            ) : (
                                <Redirect to="/login"/>
                            )}
                        </Route>

                        <Route exact path="/admin">
                            <Admin/>
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>
                </main>
                <Footer/>
            </Router>
    );
};

export default Routes;
