import React, {useEffect, useState, useRef} from 'react';
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import {CSSTransition} from "react-transition-group";

const HeaderRefuge = () => {
    const {_id} = useParams();
    const [data, setData] = useState([]);
    const [ariaExpanded, setAriaExpanded] = useState(false);
    const [ariaHidden, setAriaHidden] = useState(true);
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/page/' + _id)
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                return err;
            });
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [_id]);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    const toggle = (e) => {
        setAriaExpanded(!ariaExpanded);
        setAriaHidden(!ariaHidden);
        e.preventDefault();
    };

    const menu = Object.values(Object.assign({}, (data.menu))).map((niv1, i) => {
            if (Object.prototype.toString.call(niv1) === '[object Object]') {
                return (
                    <li key={i}>
                        <a id="nav-1" href={Object.keys(niv1).toString().replace(/ /g, "_")}
                           className="withChild aria-toggle" role="button"
                           aria-controls={"sousMenu_" + i} aria-expanded={ariaExpanded.toString()} onClick={toggle}>
                            <span key={Object.keys(niv1)}>{Object.keys(niv1)}</span>
                        </a>
                        <CSSTransition in={ariaExpanded} onEnter={calcHeight} timeout={500} classNames="my_node">
                            <div id={"sousMenu_" + i} className="sousMenu" aria-labelledby={"sousMenu_" + i}
                                 aria-hidden={ariaHidden.toString()} style={{height: menuHeight}} ref={dropdownRef}>
                                <ul>
                                    {niv1[Object.keys(niv1)].map(
                                        (niv2, i2) => {
                                            return (
                                                <li key={i2}>
                                                    <NavLink exact to={niv2.replace(/ /g, "_")}
                                                             activeClassName="nav-active">
                                                        <span key={niv2}>{niv2}</span>
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </CSSTransition>
                    </li>
                )
            } else {
                return (
                    <li key={i}>
                        <NavLink exact to={niv1.toString().replace(/ /g, "_")} activeClassName="nav-active">
                            <span key={niv1.toString()}>{niv1.toString()}</span>
                        </NavLink>
                    </li>
                )
            }
        }
    );

    return (
        <div id="menuRefuge" className="menu">
            <a href="/">
                <img src="" alt="Logo - Refuge"/>
            </a>
            <ul className="navigation">
                {menu}
            </ul>
        </div>
    );
};

export default HeaderRefuge;