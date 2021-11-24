import React from 'react';
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import $ from 'jquery';

const Header = () => {
    return (
        <header id="bandeauHaut" className="menu">
            <Logo/>
            <Navigation/>
        </header>
    );
};

export default Header;