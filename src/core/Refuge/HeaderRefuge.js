import React from 'react';
import $ from 'jquery';
import {NavLink} from "react-router-dom";
import firebase from "../../utils/firebaseConfig";

        var heightBandeau = $("#bandeauHaut").innerHeight();
        $("#corps").css('margin-top', heightBandeau);
        $("#bandeauHaut").addClass('sticky');


const HeaderRefuge = () => {
    return (
        <div id="menuRefuge" className="menu">
            <a href="">
                <img src="" alt="Logo - Refuge"/>
            </a>
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
        </div>


    );
};

export default HeaderRefuge;