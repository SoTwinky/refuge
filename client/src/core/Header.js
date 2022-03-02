import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import HeaderRefuge from "./Refuge/HeaderRefuge";
import {useParams} from "react-router-dom";

const Header = () => {
    const {_id} = useParams();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (_id) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [_id]);

    return (
        <header id="bandeauHaut" className="menu">
            <div>
                <div id="menuSite" className={visible ? "refuge" : ""}>
                    <Logo/>
                    <Navigation/>
                </div>
                {visible &&
                    <HeaderRefuge/>
                }
            </div>
        </header>
    );
};

export default Header;