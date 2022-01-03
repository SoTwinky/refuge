import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UidContext} from "./AppContext";
import {useSelector} from "react-redux";

const Navigation = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

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
                {uid ? (
                    <NavLink exact to="/profil" className="profil" activeClassName="nav-active">
                        <span>{userData.pseudo}</span>
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