import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import {NavLink, useParams} from "react-router-dom";
import firebase from "../../utils/firebaseConfig";
import axios from "axios";
import PetsRefuge from "../../components/PetsRefuge";

const HeaderRefuge = ({url}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3003/refuges?url=' + url)
            .then((res) => {
                setData(res.data);
            });
    }, []);


    const menu = data.map((item) => {
        return item.menu.map((niv1) => {
            if (Object.prototype.toString.call(niv1) === '[object Object]') {
                return (
                    <li>
                        <a id="nav-1" href={Object.keys(niv1)} className="withChild aria-toggle" role="button"
                           aria-controls="sousMenu_9817" aria-expanded="true" activeClassName="nav-active">
                            <span key={Object.keys(niv1)}>{Object.keys(niv1)}</span>
                        </a>
                        <div id="sousMenu_9817" className="sousMenu" aria-labelledby="nav1_9817" aria-hidden="true">
                            <ul>
                                {niv1[Object.keys(niv1)].map(
                                    (niv2, i) => {
                                        return (
                                            <li>
                                                <NavLink exact to={niv2.replace(/ /g,"_")} activeClassName="nav-active">
                                                    <span key={niv2}>{niv2}</span>
                                                </NavLink>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </li>
                )
            } else {
                return (
                    <li>
                        <NavLink exact to={niv1.toString().replace(/ /g,"_")} activeClassName="nav-active">
                            <span key={niv1.toString()}>{niv1.toString()}</span>
                        </NavLink>
                    </li>
                )
            }
        })
    });

    return (
        <div id="menuRefuge" className="menu">
            <a href="">
                <img src="" alt="Logo - Refuge"/>
            </a>
            <ul className="navigation">
                {menu}
            </ul>
        </div>


    );
};

export default HeaderRefuge;