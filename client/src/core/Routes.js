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
import SuperAdmin from "../pages/SuperAdmin";
import PetsFavorites from "../pages/Profil/PetsFavorites";
import NewPet from "../pages/New/NewPet";
import NewRefuge from "../pages/New/NewRefuge";
import NewUser from "../pages/New/NewUser";
import EditRefuge from "../pages/Edit/EditRefuge";
import EditPet from "../pages/Edit/EditPet";
import EditUser from "../pages/Edit/EditUser";

const Routes = ({uid}) => {

    return (
        <Router>
            <Switch>
                <Route path="/refuge/:_id">
                    <Header/>
                </Route>
                <Route path="*">
                    <Header/>
                </Route>
            </Switch>
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
                    <Route path="/profil/pets-favoris">
                        <PetsFavorites/>
                    </Route>
                    <Route exact path="/admin">
                        <Admin/>
                    </Route>
                    <Route exact path="/super-admin">
                        <SuperAdmin/>
                    </Route>
                    <Route exact path="/super-admin/new-refuge">
                        <NewRefuge/>
                    </Route>
                    <Route exact path="/super-admin/new-pet">
                        <NewPet/>
                    </Route>
                    <Route exact path="/super-admin/new-user">
                        <NewUser/>
                    </Route>
                    <Route exact path="/super-admin/edit-refuge/:id">
                        <EditRefuge/>
                    </Route>
                    <Route exact path="/super-admin/edit-pet/:id">
                        <EditPet/>
                    </Route>
                    <Route exact path="/super-admin/edit-user/:id">
                        <EditUser/>
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
