import React, {useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {UidContext} from "../components/AppContext";
import Logout from "../components/Log/Logout";
import Slider from "react-slick";
import $ from "jquery";
import PetsFavorites from "./Profil/PetsFavorites";
import axios from "axios";
import {useParams} from "react-router-dom";

const Profil = () => {
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/user/' + uid)
            .then((res) => {
                setUser(res.data);
            });
    }, [uid]);

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true
    };

    $(document).ready(function () {
        $(".randomColor").each(function() {
            var h = 25;
            var s = Math.floor(Math.random() * 147) + 127;
            var l = Math.floor(Math.random() * 255) + 240;
            this.style.backgroundColor = 'rgb(' + h + ', ' + s + ', ' + l + ')';
        });
    });

    return (
        <div className="innerCenter admin">
            <div className="flexBetween">
                <h1>Bonjour {userData.pseudo},</h1>
                <ul>
                    <li>
                        <a href="/admin"><span>Administrateur</span></a>
                    </li>
                    {user.super_admin &&
                        <li>
                        <a href="/super-admin"><span>Super Administrateur</span></a>
                        </li>
                    }
                </ul>
            </div>
            <p>Ici, vous retrouverez vos raccourcis et votre profil ! </p>
            <div>
                <h2>Mon raccourcis :</h2>
                <div className="relative">
                    <Slider {...settings} className="liste_slick ul_slider">
                        <div className="item randomColor">
                            <a href="/admin" className="user"><span>Mon profil</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mes coordonnées</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mes informations</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Mon historique</span></a>
                        </div>
                        <div className="item randomColor">
                            <a href="/admin"><span>Ma feuille d'imposition</span></a>
                        </div>
                    </Slider>
                </div>
            </div>
            <div>
                <h2>Mon profil complet :</h2>
                <ul className="liste_3 ul_slider">
                    <li className="item randomColor">
                        <a href="/admin" className="user"><span>Mon profil</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Mes coordonnées</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Mes informations</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Mon historique</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Ma feuille d'imposition</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Mes refuges favoris</span></a>
                    </li>
                    <li className="item randomColor">
                        <a href="/admin"><span>Mes animaux favoris</span></a>
                    </li>
                    <Logout uid={uid}/>
                </ul>
            </div>
        </div>
    );
};

export default Profil;