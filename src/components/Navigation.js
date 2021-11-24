import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
        </div>
    );
};

export default Navigation;